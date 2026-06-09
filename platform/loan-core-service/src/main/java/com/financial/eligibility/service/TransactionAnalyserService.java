package com.financial.eligibility.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.financial.eligibility.model.AnalysisResult;
import com.financial.eligibility.model.AnalysisResult.KeyDateBalance;
import com.financial.eligibility.model.AnalysisResult.LoanDetail;
import com.financial.eligibility.model.AnalysisResult.MerchantCategory;
import com.financial.eligibility.model.AnalysisResult.MonthlySummary;
import com.financial.eligibility.model.Transaction;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TransactionAnalyserService {

    // ── Keyword sets ──────────────────────────────────────────────────────────

    private static final List<String> SALARY_KEYWORDS = List.of(
        // Explicit salary labels
        "SALARY", "SAL/", "SAL ", "SAL-", "SALCR", "SAL CR",
        "STIPEND", "PAYROLL", "WAGES", "WAGE ",
        // NEFT variants
        "NEFT-SAL", "NEFT SAL", "NEFT/SAL", "NEFT/SALARY",
        "INFT-SAL", "NEFT CR SAL", "NEFT-CR-SAL",
        // IMPS variants
        "IMPS-SAL", "IMPS SAL", "IMPS/SAL",
        // RTGS variants (large employer transfers)
        "RTGS SAL", "RTGS-SAL", "RTGS CR SAL",
        // Employer / company transfer patterns
        "EMP-", "EMPLOYER", "MONTHLY PAY",
        "BY SAL", "BY SALARY",
        "EMP SAL", "EMP SALARY", "CORP SAL",
        // Transfer / credit labels
        "SALARY CR", "CREDITED-SALARY", "SALARY CREDIT",
        "SALARY TRANSFER", "SALARY DEPOSIT",
        "BY TRANSFER-SAL", "FT-SAL", "FT SAL",
        "INB SALARY", "INB-SAL",
        "PAY-", "PAY/",
        "PAYSLIP", "PAYINSLIP", "PAYROLL CR", "PAY CREDIT",
        "MONTHLY SALARY", "MTHLY SAL",
        "BASIC PAY", "NET PAY",
        "ACCT PAY", "STAFF SAL",
        // Batch / bulk payroll credits
        "BULK CREDIT", "BULK CR",
        // Variable / supplementary pay components
        "BONUS", "ARREAR", "ARREARS",
        "INCENTIVE", "VARIABLE PAY", "VAR PAY",
        "ADVANCE SAL", "ADV SAL",
        "GRATUITY",
        // HR systems
        "HRMS",
        // Salary payment labels used by government/PSU employers
        "SALARY PAYMENT", "SAL PAYMENT", "SAL PMT", "SALARY PMT",
        // SGB/SGBOFT — State Bank Group payment gateway used by government employers
        "SGBOFT",
        // Common transfer descriptions that are salary in practice
        "BOSER", "BOSE PAYMENT",           // Board of Secondary Education (ICICI)
        "MONTHLY INTEREST PAYOUT",         // savings interest (minor but useful)
        // Rajasthan/state government salary disbursement (SBI "CMP RAJASTHAN" etc.)
        "CMP ",
        // ─── Government salary disbursement systems ──────────────────────────────
        "PFMS", "PFMS/",            // Public Financial Management System (Central Govt)
        "IFMS", "IFMS/",            // Integrated Financial Management System (state govts)
        "CDA SAL", "CDA/SAL",       // Controller of Defence Accounts
        "PCDA", "PCDA/",            // Principal Controller of Defence Accounts (defence salary)
        "TREASURY SAL", "TREASURY SALARY", "TREASURY PAY",
        "GOVT SAL", "GOVT SALARY", "GOVT/SAL",
        "STATE SAL", "STATE SALARY",
        "CENTRAL SAL", "CENTRAL SALARY",
        "MANAV SAMPADA",            // UP / other state govt HR & payroll system
        // ─── Defence salary ───────────────────────────────────────────────────────
        "ARMY SAL", "ARMY PAY",
        "NAVY SAL", "NAVY PAY",
        "AF SAL",                   // Air Force salary
        "DEFENCE SAL", "DEF SAL",
        // ─── Railway salary ───────────────────────────────────────────────────────
        "RAILWAY SAL", "RLWY SAL", "RLY SAL",
        // ─── Allowance arrears (DA/HRA revision credits) ──────────────────────────
        "DA ARREAR", "HRA ARREAR",
        "REVISED PAY", "REV PAY",
        // ─── Additional salary labels ─────────────────────────────────────────────
        "INFT SAL",                 // INFT variant (older bank systems for NEFT SAL)
        "CORPORATE SALARY", "CORP SALARY",
        "SALARY REMITTANCE", "SAL REMITTANCE"
    );

    private static final BigDecimal SALARY_THRESHOLD = new BigDecimal("10000");

    // ── EMI / loan repayment detection ────────────────────────────────────────

    private static final List<String> EMI_KEYWORDS = List.of(
        // "EMI" bare substring avoided — it matches inside "REMITTER" (rEMItter) and "PREMIUM"
        "EMI ", " EMI", "/EMI", "_EMI", "-EMI", "EMI-",
        " LOAN", "LOAN ", "LOAN-",
        // NACH / ECS / ACH mandate debits
        "NACH", "ENACH", "NACHDB", "NACH DEBIT", "NACH DR", "NACH DB",
        "ECS", "ACH ", "ACH-", "ACH D", "ACH-D", "ACHDr", "ACHDB", "ACH DR", "ACH/",
        "MANDATE DR", "MANDATE DEBIT", "MANDATE DB",
        // Instalment spellings
        "INSTL", "INSTALLMENT", "INSTALMENT", "EQUATED MONTHLY",
        "REPAYMENT", "LOAN REPAY",
        // Auto-debit / standing instructions
        "AUTO-DEBIT", "AUTO DEBIT", "STANDING INST", "STANDING ORDER", "SI-DR",
        // Loan types
        "HOME LOAN", "CAR LOAN", "AUTO LOAN",
        "PERSONAL LOAN", "PERSONAL LN",
        "VEHICLE LOAN", "VEH LOAN", "TWO WHEELER", "2 WHEELER", "BIKE LOAN",
        "EDUCATION LOAN", "EDU LOAN",
        "GOLD LOAN", "LOAN ACCOUNT", "FLEXI LOAN",
        // Overdraft interest
        "OD INTEREST", "OD INT",
        // Common NBFCs & lenders (frequently seen in statement narrations)
        "BAJAJ FIN", "BAJAJ FINSERV", "BAJFINSERV", "BAJAJ ALLIANZ",
        "ADITYA BIRLA", "BIRLA CAPITAL",   // ICICI ACH/ADITYA BIRLA CAPITAL
        "MUTHOOT", "MUTHOOTMERCANTI",  // Muthoot Mercantile / Muthoot Finance
        "MANAPPURAM",                   // Manappuram Finance (gold loans)
        "CAPRI",                        // Capri Loans (personal/business loans)
        "SHRIRAM FIN",
        "FULLERTON",
        "TATA CAPITAL", "TATA CAP",
        "MAHINDRA FIN",
        "CHOLAMANDALAM", "CHOLA ",
        "SUNDARAM FIN",
        "IDFC FIRST",
        "L&T FIN",
        "PNB HOUSING", "PNB HSG",          // PNB Housing Finance (AU Bank)
        "JIO FINANCE", "JIO FIN",          // Jio Financial Services
        "FLOT",                            // Flot BNPL — EMI narration is "UPI/Flot/.../EMIPayment"
        // CMS/Collection Management System — bank deducts via NACH mandate, SMSOTP = SMS-OTP auth
        "SMSOTP", "CMS/",
        // ─── Housing Finance Companies (HFCs) ────────────────────────────────────
        "LIC HOUSING", "LICHFL", "LIC HSG",
        "INDIABULLS HSG", "IBULLS", "INDIABULLSHSG",
        "AAVAS FIN", "AAVASFINANCIER",
        "CANFIN", "CAN FIN",
        "HOME FIRST", "HOMEFIRST",
        "REPCO HOME", "REPCO FIN",
        "GIC HOUSING", "GICHFL",
        "INDIA SHELTER",
        "VASTU HOUSING", "VASTU HSG",
        "APTUS",
        "BAJAJ HOUSING", "BAJAJ HSG",
        // ─── Additional NBFCs ─────────────────────────────────────────────────────
        "HERO FINCORP", "HERO FIN", "HEROFINCO",
        "TVS CREDIT", "TVSCREDIT",
        "IIFL FIN", "IIFL",
        "HDB FIN", "HDBFS", "HDBFINANCIALS",
        "POONAWALLA FIN", "POONAWALLA",
        "DMI FIN", "DMI FINANCE",
        "NAVI FIN", "NAVIFINSERV",
        "INCRED FIN", "INCRED",
        "UGRO CAP", "UGRO CAPITAL",
        "CLIX CAP", "CLIX CAPITAL",
        "LENDINGKART",
        "AXIS FINANCE",
        "KOTAK PRIME", "KOTAKPRIME",
        // ─── Fintech / Digital Lenders / BNPL ────────────────────────────────────
        "KREDITBEE", "KREDIT BEE",
        "KISSHT",
        "CASHE",
        "FIBE", "EARLYSALARY",
        "ZESTMONEY",
        "LAZYPAY", "LAZY PAY",
        "MPOKKET",
        "STASHFIN",
        "LOANTAP",
        "MONEYVIEW", "MONEY VIEW",
        "SMARTCOIN",
        "RUPEEK",
        "NIRA FIN", "NIRAFIN",
        "PAYTM POSTPAID",
        "AMAZON PAY LATER", "AMZN PAY LATER",
        "FLIPKART PAY LATER",
        "CREDIT CARD EMI", "CCARD EMI",
        // ─── Small Finance Banks as lenders ──────────────────────────────────────
        "BANDHAN",
        "UJJIVAN",
        "EQUITAS SFB", "EQUITAS BANK",
        "FINCARE SFB", "FINCARE",
        "JANA SFB", "JANA BANK",
        "UTKARSH SFB",
        // ─── Banks appearing as direct / co-lenders via NACH ─────────────────────
        "HDFCBANKLTD", "HDFC BANK EMI",
        "ICICIBANKL", "ICICI BANK EMI",
        "SBI CARD", "SBICARD",
        "BOB FINANCIAL"
    );

    // ── Lender display-name lookup (ordered: specific before generic) ──────────

    private static final Map<String, String> LENDER_NAMES = new LinkedHashMap<>();
    static {
        LENDER_NAMES.put("ADITYA BIRLA",    "Aditya Birla Capital");
        LENDER_NAMES.put("BIRLA CAPITAL",   "Aditya Birla Capital");
        LENDER_NAMES.put("BAJFINSERV",      "Bajaj Finance");
        LENDER_NAMES.put("BAJAJ FINSERV",   "Bajaj Finance");
        LENDER_NAMES.put("BAJAJ FIN",       "Bajaj Finance");
        LENDER_NAMES.put("BAJAJ ALLIANZ",   "Bajaj Allianz");
        LENDER_NAMES.put("CHOLAMANDALAM",   "Cholamandalam Finance");
        LENDER_NAMES.put("CHOLA ",          "Cholamandalam Finance");
        LENDER_NAMES.put("TATA CAPITAL",    "Tata Capital");
        LENDER_NAMES.put("TATA CAP",        "Tata Capital");
        LENDER_NAMES.put("MAHINDRA FIN",    "Mahindra Finance");
        LENDER_NAMES.put("MUTHOOT",         "Muthoot Finance");
        LENDER_NAMES.put("MUTHOOTMERCANTI", "Muthoot Mercantile");
        LENDER_NAMES.put("MANAPPURAM",      "Manappuram Finance");
        LENDER_NAMES.put("CAPRI",           "Capri Loans");
        LENDER_NAMES.put("SHRIRAM FIN",     "Shriram Finance");
        LENDER_NAMES.put("FULLERTON",       "Fullerton India");
        LENDER_NAMES.put("SUNDARAM FIN",    "Sundaram Finance");
        LENDER_NAMES.put("IDFC FIRST",      "IDFC First Bank");
        LENDER_NAMES.put("L&T FIN",         "L&T Finance");
        LENDER_NAMES.put("PNB HOUSING",     "PNB Housing Finance");
        LENDER_NAMES.put("PNB HSG",         "PNB Housing Finance");
        LENDER_NAMES.put("JIO FINANCE",     "Jio Financial Services");
        LENDER_NAMES.put("JIO FIN",         "Jio Financial Services");
        LENDER_NAMES.put("FLOT",            "Flot (BNPL)");
        LENDER_NAMES.put("SMSOTP",          "CMS / Mandate Collection");
        LENDER_NAMES.put("HOME LOAN",       "Home Loan");
        LENDER_NAMES.put("PERSONAL LOAN",   "Personal Loan");
        LENDER_NAMES.put("PERSONAL LN",     "Personal Loan");
        LENDER_NAMES.put("CAR LOAN",        "Car / Auto Loan");
        LENDER_NAMES.put("AUTO LOAN",       "Car / Auto Loan");
        LENDER_NAMES.put("VEHICLE LOAN",    "Vehicle Loan");
        LENDER_NAMES.put("VEH LOAN",        "Vehicle Loan");
        LENDER_NAMES.put("TWO WHEELER",     "Two-Wheeler Loan");
        LENDER_NAMES.put("2 WHEELER",       "Two-Wheeler Loan");
        LENDER_NAMES.put("BIKE LOAN",       "Two-Wheeler Loan");
        LENDER_NAMES.put("EDUCATION LOAN",  "Education Loan");
        LENDER_NAMES.put("EDU LOAN",        "Education Loan");
        LENDER_NAMES.put("GOLD LOAN",       "Gold Loan");
        LENDER_NAMES.put("FLEXI LOAN",      "Flexi Loan");
        LENDER_NAMES.put("BUSINESS LOAN",   "Business Loan");
        // ─── Housing Finance Companies (HFCs) ────────────────────────────────────
        LENDER_NAMES.put("LICHFL",           "LIC Housing Finance");
        LENDER_NAMES.put("LIC HOUSING",      "LIC Housing Finance");
        LENDER_NAMES.put("LIC HSG",          "LIC Housing Finance");
        LENDER_NAMES.put("INDIABULLSHSG",    "Indiabulls Housing Finance");
        LENDER_NAMES.put("INDIABULLS HSG",   "Indiabulls Housing Finance");
        LENDER_NAMES.put("IBULLS",           "Indiabulls Housing Finance");
        LENDER_NAMES.put("AAVASFINANCIER",   "Aavas Financiers");
        LENDER_NAMES.put("AAVAS FIN",        "Aavas Financiers");
        LENDER_NAMES.put("CAN FIN HOMES",    "Can Fin Homes");
        LENDER_NAMES.put("CANFIN",           "Can Fin Homes");
        LENDER_NAMES.put("HOMEFIRST",        "Home First Finance");
        LENDER_NAMES.put("HOME FIRST",       "Home First Finance");
        LENDER_NAMES.put("REPCO HOME",       "Repco Home Finance");
        LENDER_NAMES.put("REPCO FIN",        "Repco Home Finance");
        LENDER_NAMES.put("GICHFL",           "GIC Housing Finance");
        LENDER_NAMES.put("GIC HOUSING",      "GIC Housing Finance");
        LENDER_NAMES.put("INDIA SHELTER",    "India Shelter Finance");
        LENDER_NAMES.put("VASTU HOUSING",    "Vastu Housing Finance");
        LENDER_NAMES.put("VASTU HSG",        "Vastu Housing Finance");
        LENDER_NAMES.put("APTUS",            "Aptus Value Housing Finance");
        LENDER_NAMES.put("BAJAJ HOUSING",    "Bajaj Housing Finance");
        LENDER_NAMES.put("BAJAJ HSG",        "Bajaj Housing Finance");
        // ─── Additional NBFCs ─────────────────────────────────────────────────────
        LENDER_NAMES.put("HEROFINCO",        "Hero FinCorp");
        LENDER_NAMES.put("HERO FINCORP",     "Hero FinCorp");
        LENDER_NAMES.put("HERO FIN",         "Hero FinCorp");
        LENDER_NAMES.put("TVSCREDIT",        "TVS Credit");
        LENDER_NAMES.put("TVS CREDIT",       "TVS Credit");
        LENDER_NAMES.put("IIFL FIN",         "IIFL Finance");
        LENDER_NAMES.put("IIFL",             "IIFL Finance");
        LENDER_NAMES.put("HDBFINANCIALS",    "HDB Financial Services");
        LENDER_NAMES.put("HDBFS",            "HDB Financial Services");
        LENDER_NAMES.put("HDB FIN",          "HDB Financial Services");
        LENDER_NAMES.put("POONAWALLA FIN",   "Poonawalla Fincorp");
        LENDER_NAMES.put("POONAWALLA",       "Poonawalla Fincorp");
        LENDER_NAMES.put("DMI FINANCE",      "DMI Finance");
        LENDER_NAMES.put("DMI FIN",          "DMI Finance");
        LENDER_NAMES.put("NAVIFINSERV",      "Navi Finserv");
        LENDER_NAMES.put("NAVI FIN",         "Navi Finserv");
        LENDER_NAMES.put("INCRED FIN",       "InCred Finance");
        LENDER_NAMES.put("INCRED",           "InCred Finance");
        LENDER_NAMES.put("UGRO CAPITAL",     "UGRO Capital");
        LENDER_NAMES.put("UGRO CAP",         "UGRO Capital");
        LENDER_NAMES.put("CLIX CAPITAL",     "Clix Capital");
        LENDER_NAMES.put("CLIX CAP",         "Clix Capital");
        LENDER_NAMES.put("LENDINGKART",      "Lendingkart");
        LENDER_NAMES.put("AXIS FINANCE",     "Axis Finance");
        LENDER_NAMES.put("KOTAKPRIME",       "Kotak Mahindra Prime");
        LENDER_NAMES.put("KOTAK PRIME",      "Kotak Mahindra Prime");
        // ─── Fintech / Digital Lenders / BNPL ────────────────────────────────────
        LENDER_NAMES.put("KREDITBEE",        "KreditBee");
        LENDER_NAMES.put("KREDIT BEE",       "KreditBee");
        LENDER_NAMES.put("KISSHT",           "Kissht");
        LENDER_NAMES.put("CASHE",            "CASHe");
        LENDER_NAMES.put("EARLYSALARY",      "Fibe (EarlySalary)");
        LENDER_NAMES.put("FIBE",             "Fibe (EarlySalary)");
        LENDER_NAMES.put("ZESTMONEY",        "ZestMoney");
        LENDER_NAMES.put("LAZYPAY",          "LazyPay");
        LENDER_NAMES.put("LAZY PAY",         "LazyPay");
        LENDER_NAMES.put("MPOKKET",          "mPokket");
        LENDER_NAMES.put("STASHFIN",         "StashFin");
        LENDER_NAMES.put("LOANTAP",          "LoanTap");
        LENDER_NAMES.put("MONEYVIEW",        "MoneyView");
        LENDER_NAMES.put("MONEY VIEW",       "MoneyView");
        LENDER_NAMES.put("SMARTCOIN",        "SmartCoin / Olyv");
        LENDER_NAMES.put("RUPEEK",           "Rupeek");
        LENDER_NAMES.put("NIRAFIN",          "Nira Finance");
        LENDER_NAMES.put("NIRA FIN",         "Nira Finance");
        LENDER_NAMES.put("PAYTM POSTPAID",   "Paytm Postpaid");
        LENDER_NAMES.put("AMAZON PAY LATER", "Amazon Pay Later");
        LENDER_NAMES.put("AMZN PAY LATER",   "Amazon Pay Later");
        LENDER_NAMES.put("FLIPKART PAY LATER","Flipkart Pay Later");
        LENDER_NAMES.put("CREDIT CARD EMI",  "Credit Card EMI");
        LENDER_NAMES.put("CCARD EMI",        "Credit Card EMI");
        // ─── Small Finance Banks as lenders ──────────────────────────────────────
        LENDER_NAMES.put("BANDHAN",          "Bandhan Bank");
        LENDER_NAMES.put("UJJIVAN",          "Ujjivan SFB");
        LENDER_NAMES.put("EQUITAS SFB",      "Equitas SFB");
        LENDER_NAMES.put("EQUITAS BANK",     "Equitas SFB");
        LENDER_NAMES.put("FINCARE SFB",      "Fincare SFB");
        LENDER_NAMES.put("FINCARE",          "Fincare SFB");
        LENDER_NAMES.put("JANA SFB",         "Jana SFB");
        LENDER_NAMES.put("JANA BANK",        "Jana SFB");
        LENDER_NAMES.put("UTKARSH SFB",      "Utkarsh SFB");
        // ─── Banks as co-lenders / direct lenders (NACH originator codes) ─────────
        LENDER_NAMES.put("HDFCBANKLTD",      "HDFC Bank");
        LENDER_NAMES.put("HDFC BANK EMI",    "HDFC Bank");
        LENDER_NAMES.put("ICICIBANKL",       "ICICI Bank");
        LENDER_NAMES.put("ICICI BANK EMI",   "ICICI Bank");
        LENDER_NAMES.put("SBICARD",          "SBI Card");
        LENDER_NAMES.put("SBI CARD",         "SBI Card");
        LENDER_NAMES.put("BOB FINANCIAL",    "BOB Financial Solutions");
        // ─── Axis Bank specific loan narration patterns ────────────────────────────
        LENDER_NAMES.put("YES BANK LIMITED", "Yes Bank");
        LENDER_NAMES.put("YES BANK",         "Yes Bank");
        // PPR = Axis Bank pre-authorised EMI code (PPRxxxxxxxxx_EMI_DD-MM-YYYY_Name)
        LENDER_NAMES.put("PPR",              "Axis Bank (Loan EMI)");
        // FIN INDIAN CLEARING = Axis Bank NACH collection gateway
        LENDER_NAMES.put("FIN INDIAN CLEARING", "NACH Mandate Collection");
    }

    // ── Loan-category lookup ──────────────────────────────────────────────────

    private static final Map<String, String> LOAN_CATEGORIES = new LinkedHashMap<>();
    static {
        LOAN_CATEGORIES.put("HOME LOAN",        "Home Loan");
        LOAN_CATEGORIES.put("HOUSING LOAN",     "Home Loan");
        LOAN_CATEGORIES.put("PERSONAL LOAN",    "Personal Loan");
        LOAN_CATEGORIES.put("PERSONAL LN",      "Personal Loan");
        LOAN_CATEGORIES.put("CAR LOAN",         "Car / Auto Loan");
        LOAN_CATEGORIES.put("AUTO LOAN",        "Car / Auto Loan");
        LOAN_CATEGORIES.put("VEHICLE LOAN",     "Vehicle Loan");
        LOAN_CATEGORIES.put("VEH LOAN",         "Vehicle Loan");
        LOAN_CATEGORIES.put("TWO WHEELER",      "Two-Wheeler Loan");
        LOAN_CATEGORIES.put("2 WHEELER",        "Two-Wheeler Loan");
        LOAN_CATEGORIES.put("BIKE LOAN",        "Two-Wheeler Loan");
        LOAN_CATEGORIES.put("EDUCATION LOAN",   "Education Loan");
        LOAN_CATEGORIES.put("EDU LOAN",         "Education Loan");
        LOAN_CATEGORIES.put("GOLD LOAN",        "Gold Loan");
        LOAN_CATEGORIES.put("FLEXI LOAN",       "Flexi Loan");
        LOAN_CATEGORIES.put("BUSINESS LOAN",    "Business Loan");
        LOAN_CATEGORIES.put("FLOT",             "BNPL / Buy Now Pay Later");
        LOAN_CATEGORIES.put("SMSOTP",           "Loan EMI (NACH Mandate)");
        LOAN_CATEGORIES.put("CMS/",             "Loan EMI (NACH Mandate)");
        LOAN_CATEGORIES.put("MUTHOOT",          "Gold Loan");
        LOAN_CATEGORIES.put("MUTHOOTMERCANTI",  "Gold Loan");
        LOAN_CATEGORIES.put("MANAPPURAM",       "Gold Loan");
        LOAN_CATEGORIES.put("CAPRI",            "Personal Loan");
        // ─── Home loans via HFCs ──────────────────────────────────────────────────
        LOAN_CATEGORIES.put("LICHFL",           "Home Loan");
        LOAN_CATEGORIES.put("LIC HOUSING",      "Home Loan");
        LOAN_CATEGORIES.put("LIC HSG",          "Home Loan");
        LOAN_CATEGORIES.put("INDIABULLS HSG",   "Home Loan");
        LOAN_CATEGORIES.put("IBULLS",           "Home Loan");
        LOAN_CATEGORIES.put("AAVAS FIN",        "Home Loan");
        LOAN_CATEGORIES.put("CANFIN",           "Home Loan");
        LOAN_CATEGORIES.put("HOMEFIRST",        "Home Loan");
        LOAN_CATEGORIES.put("HOME FIRST",       "Home Loan");
        LOAN_CATEGORIES.put("REPCO HOME",       "Home Loan");
        LOAN_CATEGORIES.put("GIC HOUSING",      "Home Loan");
        LOAN_CATEGORIES.put("INDIA SHELTER",    "Home Loan");
        LOAN_CATEGORIES.put("VASTU HOUSING",    "Home Loan");
        LOAN_CATEGORIES.put("APTUS",            "Home Loan");
        LOAN_CATEGORIES.put("BAJAJ HOUSING",    "Home Loan");
        // ─── Vehicle loans ────────────────────────────────────────────────────────
        LOAN_CATEGORIES.put("HEROFINCO",        "Vehicle Loan");
        LOAN_CATEGORIES.put("HERO FINCORP",     "Vehicle Loan");
        LOAN_CATEGORIES.put("HERO FIN",         "Vehicle Loan");
        LOAN_CATEGORIES.put("TVSCREDIT",        "Vehicle Loan");
        LOAN_CATEGORIES.put("TVS CREDIT",       "Vehicle Loan");
        LOAN_CATEGORIES.put("KOTAKPRIME",       "Vehicle Loan");
        LOAN_CATEGORIES.put("KOTAK PRIME",      "Vehicle Loan");
        // ─── Gold loans ───────────────────────────────────────────────────────────
        LOAN_CATEGORIES.put("IIFL FIN",         "Gold Loan / Personal Loan");
        LOAN_CATEGORIES.put("IIFL",             "Gold Loan / Personal Loan");
        LOAN_CATEGORIES.put("RUPEEK",           "Gold Loan");
        // ─── Personal loans ───────────────────────────────────────────────────────
        LOAN_CATEGORIES.put("HDBFINANCIALS",    "Personal Loan");
        LOAN_CATEGORIES.put("HDBFS",            "Personal Loan");
        LOAN_CATEGORIES.put("HDB FIN",          "Personal Loan");
        LOAN_CATEGORIES.put("POONAWALLA FIN",   "Personal Loan");
        LOAN_CATEGORIES.put("POONAWALLA",       "Personal Loan");
        LOAN_CATEGORIES.put("NAVIFINSERV",      "Personal Loan");
        LOAN_CATEGORIES.put("NAVI FIN",         "Personal Loan");
        LOAN_CATEGORIES.put("INCRED FIN",       "Personal Loan");
        LOAN_CATEGORIES.put("INCRED",           "Personal Loan");
        LOAN_CATEGORIES.put("KREDITBEE",        "Personal Loan");
        LOAN_CATEGORIES.put("KREDIT BEE",       "Personal Loan");
        LOAN_CATEGORIES.put("CASHE",            "Personal Loan");
        LOAN_CATEGORIES.put("STASHFIN",         "Personal Loan");
        LOAN_CATEGORIES.put("LOANTAP",          "Personal Loan");
        LOAN_CATEGORIES.put("MONEYVIEW",        "Personal Loan");
        LOAN_CATEGORIES.put("MPOKKET",          "Personal Loan");
        LOAN_CATEGORIES.put("KISSHT",           "Personal Loan / BNPL");
        LOAN_CATEGORIES.put("NIRAFIN",          "Personal Loan");
        LOAN_CATEGORIES.put("NIRA FIN",         "Personal Loan");
        LOAN_CATEGORIES.put("AXIS FINANCE",     "Personal Loan");
        LOAN_CATEGORIES.put("DMI FINANCE",      "Personal Loan");
        LOAN_CATEGORIES.put("DMI FIN",          "Personal Loan");
        // ─── Business loans ───────────────────────────────────────────────────────
        LOAN_CATEGORIES.put("LENDINGKART",      "Business Loan");
        LOAN_CATEGORIES.put("UGRO CAPITAL",     "Business Loan");
        LOAN_CATEGORIES.put("UGRO CAP",         "Business Loan");
        LOAN_CATEGORIES.put("CLIX CAPITAL",     "Business Loan");
        LOAN_CATEGORIES.put("CLIX CAP",         "Business Loan");
        // ─── Salary advance / short-term loans ────────────────────────────────────
        LOAN_CATEGORIES.put("EARLYSALARY",      "Salary Advance Loan");
        LOAN_CATEGORIES.put("FIBE",             "Salary Advance Loan");
        // ─── BNPL / Pay Later ─────────────────────────────────────────────────────
        LOAN_CATEGORIES.put("LAZYPAY",          "BNPL / Pay Later");
        LOAN_CATEGORIES.put("LAZY PAY",         "BNPL / Pay Later");
        LOAN_CATEGORIES.put("ZESTMONEY",        "BNPL / Consumer Loan");
        LOAN_CATEGORIES.put("PAYTM POSTPAID",   "BNPL / Pay Later");
        LOAN_CATEGORIES.put("AMAZON PAY LATER", "BNPL / Pay Later");
        LOAN_CATEGORIES.put("AMZN PAY LATER",   "BNPL / Pay Later");
        LOAN_CATEGORIES.put("FLIPKART PAY LATER","BNPL / Pay Later");
        // ─── Credit Card EMI ─────────────────────────────────────────────────────
        LOAN_CATEGORIES.put("CREDIT CARD EMI",  "Credit Card EMI");
        LOAN_CATEGORIES.put("CCARD EMI",        "Credit Card EMI");
        LOAN_CATEGORIES.put("SBICARD",          "Credit Card EMI");
        LOAN_CATEGORIES.put("SBI CARD",         "Credit Card EMI");
        LOAN_CATEGORIES.put("BOB FINANCIAL",    "Credit Card EMI");
        // ─── Small Finance Banks (microfinance / personal) ────────────────────────
        LOAN_CATEGORIES.put("BANDHAN",          "Microfinance / Personal Loan");
        LOAN_CATEGORIES.put("UJJIVAN",          "Microfinance / Personal Loan");
        LOAN_CATEGORIES.put("FINCARE SFB",      "Microfinance / Personal Loan");
        LOAN_CATEGORIES.put("FINCARE",          "Microfinance / Personal Loan");
        LOAN_CATEGORIES.put("JANA SFB",         "Personal Loan");
        LOAN_CATEGORIES.put("UTKARSH SFB",      "Microfinance / Personal Loan");
        // ─── Axis Bank specific ───────────────────────────────────────────────────
        LOAN_CATEGORIES.put("YES BANK LIMITED", "Personal Loan");
        LOAN_CATEGORIES.put("YES BANK",         "Personal Loan");
        LOAN_CATEGORIES.put("PPR",              "Axis Bank Personal / CC Loan");
        LOAN_CATEGORIES.put("FIN INDIAN CLEARING", "Loan EMI (NACH Mandate)");
    }

    private static final BigDecimal EMI_MIN_AMOUNT = new BigDecimal("1000");

    // ── Other keyword sets ────────────────────────────────────────────────────

    private static final List<String> CASH_KEYWORDS = List.of(
        "CASH", "ATM", "CDM", "WITHDRAWAL", "CASH DEP", "ATM WDL", "ATM/POS",
        "NWD", "CWD", "CHWDL", "IPOS",
        // Business-correspondent / micro-ATM (narration won't contain "ATM")
        "MICRO ATM", "MINI ATM", "BC CASH",
        // NFS network transactions at other-bank ATMs
        "NFS ATM", "NFS WDL",
        // Credit-card cash advance
        "CASH ADVANCE",
        // Foreign-exchange cash transactions
        "FOREX CASH", "CURRENCY EXCHANGE"
    );

    private static final List<String> BOUNCE_KEYWORDS = List.of(
        // Cheque bounce / return
        "RETURN", "BOUNCE", "BOUNCED", "DISHONOUR", "DISHONORED", "DISHNR",
        "CHEQUE RETURN", "CHQRET", "CHQ BOUNCE", "CHQBOUNCE",
        "INSTRUMENT RETURN",
        // Funds-related rejections
        "INSUFFICIENT", "INSUF", "INSFND", "UNPAID", "OVERDRAWN",
        // Reversals
        "REVERSAL", "REVERSED",
        // Cheque / payment stops
        "REJECTED CHQ", "STOP PAYMENT", "STOPPED",
        // NACH / ECS / ACH mandate returns (NACHRET = AU Bank abbreviation)
        "MANDATE RETURN", "MANDATE REJECT",
        "NACH RETURN", "NACHRET", "ECS RETURN", "ACH RETURN",
        // Digital payment failures
        "PAYMENT FAILED", "PAY FAILED",
        "TXN FAILED", "TRANS FAILED", "DEBIT FAILED",
        // Re-presentation after bounce
        "REPRESENT"
    );

    private static final Map<String, String> MERCHANT_MAP = new LinkedHashMap<>();
    static {
        // ── Food Delivery (restaurant delivery apps) ──────────────────────────
        MERCHANT_MAP.put("SWIGGY",          "Food Delivery");
        MERCHANT_MAP.put("ZOMATO",          "Food Delivery");
        MERCHANT_MAP.put("DUNZO",           "Food Delivery");
        MERCHANT_MAP.put("DOMINOS",         "Food Delivery");
        MERCHANT_MAP.put("PIZZA HUT",       "Food Delivery");
        MERCHANT_MAP.put("PIZZA",           "Food Delivery");
        MERCHANT_MAP.put("KFC",             "Food Delivery");
        MERCHANT_MAP.put("MCDONALDS",       "Food Delivery");
        MERCHANT_MAP.put("MCDONALD",        "Food Delivery");
        MERCHANT_MAP.put("BURGER KING",     "Food Delivery");
        MERCHANT_MAP.put("SUBWAY",          "Food Delivery");
        MERCHANT_MAP.put("STARBUCKS",       "Food Delivery");
        MERCHANT_MAP.put("CAFE COFFEE",     "Food Delivery");
        MERCHANT_MAP.put("CCD ",            "Food Delivery");
        MERCHANT_MAP.put("FAASOS",          "Food Delivery");
        MERCHANT_MAP.put("BOX8",            "Food Delivery");

        // ── Grocery & Quick Commerce ──────────────────────────────────────────
        MERCHANT_MAP.put("BIGBASKET",       "Grocery");
        MERCHANT_MAP.put("BIG BASKET",      "Grocery");
        MERCHANT_MAP.put("BLINKIT",         "Grocery");
        MERCHANT_MAP.put("ZEPTO",           "Grocery");
        MERCHANT_MAP.put("INSTAMART",       "Grocery");
        MERCHANT_MAP.put("JIOMART",         "Grocery");
        MERCHANT_MAP.put("JIO MART",        "Grocery");
        MERCHANT_MAP.put("GROFERS",         "Grocery");
        MERCHANT_MAP.put("SUPERMART",       "Grocery");
        MERCHANT_MAP.put("DMART",           "Grocery");
        MERCHANT_MAP.put("RELIANCE FRESH",  "Grocery");
        MERCHANT_MAP.put("MORE RETAIL",     "Grocery");
        MERCHANT_MAP.put("SMART BAZAAR",    "Grocery");

        // ── Online Shopping ───────────────────────────────────────────────────
        MERCHANT_MAP.put("AMAZON",          "Online Shopping");
        MERCHANT_MAP.put("FLIPKART",        "Online Shopping");
        MERCHANT_MAP.put("MYNTRA",          "Online Shopping");
        MERCHANT_MAP.put("MEESHO",          "Online Shopping");
        MERCHANT_MAP.put("AJIO",            "Online Shopping");
        MERCHANT_MAP.put("NYKAA",           "Online Shopping");
        MERCHANT_MAP.put("SNAPDEAL",        "Online Shopping");
        MERCHANT_MAP.put("TATACLIQ",        "Online Shopping");
        MERCHANT_MAP.put("TATA CLIQ",       "Online Shopping");
        MERCHANT_MAP.put("CROMA",           "Online Shopping");
        MERCHANT_MAP.put("RELIANCE DIGITAL","Online Shopping");
        MERCHANT_MAP.put("VIJAY SALES",     "Online Shopping");
        MERCHANT_MAP.put("DECATHLON",       "Online Shopping");
        MERCHANT_MAP.put("FIRSTCRY",        "Online Shopping");
        MERCHANT_MAP.put("LENSKART",        "Online Shopping");
        MERCHANT_MAP.put("PEPPERFRY",       "Online Shopping");

        // ── Fuel & Energy ────────────────────────────────────────────────────
        MERCHANT_MAP.put("PETROL",          "Fuel");
        MERCHANT_MAP.put("FUEL",            "Fuel");
        MERCHANT_MAP.put("HPCL",            "Fuel");
        MERCHANT_MAP.put("HP GAS",          "Fuel");
        MERCHANT_MAP.put("BPCL",            "Fuel");
        MERCHANT_MAP.put("BHARAT GAS",      "Fuel");
        MERCHANT_MAP.put("IOCL",            "Fuel");
        MERCHANT_MAP.put("INDIAN OIL",      "Fuel");
        MERCHANT_MAP.put("INDANE",          "Fuel");
        MERCHANT_MAP.put("SHELL",           "Fuel");
        MERCHANT_MAP.put("EV CHARGING",     "Fuel");

        // ── Travel ───────────────────────────────────────────────────────────
        MERCHANT_MAP.put("IRCTC",           "Travel");
        MERCHANT_MAP.put("RAILWAY",         "Travel");
        MERCHANT_MAP.put("UBER",            "Travel");
        MERCHANT_MAP.put("OLA",             "Travel");
        MERCHANT_MAP.put("RAPIDO",          "Travel");
        MERCHANT_MAP.put("MAKEMYTRIP",      "Travel");
        MERCHANT_MAP.put("GOIBIBO",         "Travel");
        MERCHANT_MAP.put("YATRA",           "Travel");
        MERCHANT_MAP.put("CLEARTRIP",       "Travel");
        MERCHANT_MAP.put("IXIGO",           "Travel");
        MERCHANT_MAP.put("REDBUS",          "Travel");
        MERCHANT_MAP.put("ABHIBUS",         "Travel");
        MERCHANT_MAP.put("INDIGO",          "Travel");
        MERCHANT_MAP.put("SPICEJET",        "Travel");
        MERCHANT_MAP.put("AIR INDIA",       "Travel");
        MERCHANT_MAP.put("AIRINDIA",        "Travel");
        MERCHANT_MAP.put("VISTARA",         "Travel");
        MERCHANT_MAP.put("AIRLINE",         "Travel");
        MERCHANT_MAP.put("AIRWAYS",         "Travel");
        MERCHANT_MAP.put("OYO",             "Travel");
        MERCHANT_MAP.put("TREEBO",          "Travel");
        MERCHANT_MAP.put("HOTEL",           "Travel");

        // ── Entertainment ─────────────────────────────────────────────────────
        MERCHANT_MAP.put("NETFLIX",         "Entertainment");
        MERCHANT_MAP.put("HOTSTAR",         "Entertainment");
        MERCHANT_MAP.put("DISNEY",          "Entertainment");
        MERCHANT_MAP.put("SONY LIV",        "Entertainment");
        MERCHANT_MAP.put("SONYLIV",         "Entertainment");
        MERCHANT_MAP.put("SPOTIFY",         "Entertainment");
        MERCHANT_MAP.put("PRIME",           "Entertainment");
        MERCHANT_MAP.put("YOUTUBE",         "Entertainment");
        MERCHANT_MAP.put("ZEE5",            "Entertainment");
        MERCHANT_MAP.put("JIOCINEMA",       "Entertainment");
        MERCHANT_MAP.put("JIO CINEMA",      "Entertainment");
        MERCHANT_MAP.put("VOOT",            "Entertainment");
        MERCHANT_MAP.put("MXPLAYER",        "Entertainment");
        MERCHANT_MAP.put("MX PLAYER",       "Entertainment");
        MERCHANT_MAP.put("ALT BALAJI",      "Entertainment");
        MERCHANT_MAP.put("LIONSGATE",       "Entertainment");
        MERCHANT_MAP.put("BOOKMYSHOW",      "Entertainment");

        // ── Healthcare ────────────────────────────────────────────────────────
        MERCHANT_MAP.put("PHARMA",          "Healthcare");
        MERCHANT_MAP.put("HOSPITAL",        "Healthcare");
        MERCHANT_MAP.put("CLINIC",          "Healthcare");
        MERCHANT_MAP.put("MEDICAL",         "Healthcare");
        MERCHANT_MAP.put("APOLLO",          "Healthcare");
        MERCHANT_MAP.put("MEDPLUS",         "Healthcare");
        MERCHANT_MAP.put("1MG",             "Healthcare");
        MERCHANT_MAP.put("TATA 1MG",        "Healthcare");
        MERCHANT_MAP.put("PHARMEASY",       "Healthcare");
        MERCHANT_MAP.put("NETMEDS",         "Healthcare");
        MERCHANT_MAP.put("PRACTO",          "Healthcare");
        MERCHANT_MAP.put("HEALTHKART",      "Healthcare");
        MERCHANT_MAP.put("FORTIS",          "Healthcare");
        MERCHANT_MAP.put("NARAYANA",        "Healthcare");
        MERCHANT_MAP.put("MANIPAL",         "Healthcare");
        MERCHANT_MAP.put("DR REDDY",        "Healthcare");

        // ── Utilities / Telecom ───────────────────────────────────────────────
        MERCHANT_MAP.put("ELECTRICITY",     "Utilities");
        MERCHANT_MAP.put("BESCOM",          "Utilities");
        MERCHANT_MAP.put("MSEDCL",          "Utilities");
        MERCHANT_MAP.put("TATA POWER",      "Utilities");
        MERCHANT_MAP.put("ADANI ELECTRIC",  "Utilities");
        MERCHANT_MAP.put("TORRENT POWER",   "Utilities");
        MERCHANT_MAP.put("BSNL",            "Utilities");
        MERCHANT_MAP.put("AIRTEL",          "Utilities");
        MERCHANT_MAP.put("JIO",             "Utilities");
        MERCHANT_MAP.put("VODAFONE",        "Utilities");
        MERCHANT_MAP.put("VODAFONE IDEA",   "Utilities");
        MERCHANT_MAP.put("ACT FIBERNET",    "Utilities");
        MERCHANT_MAP.put("TIKONA",          "Utilities");
        MERCHANT_MAP.put("HATHWAY",         "Utilities");
        MERCHANT_MAP.put("TATA SKY",        "Utilities");
        MERCHANT_MAP.put("DISH TV",         "Utilities");
        MERCHANT_MAP.put("DISHTV",          "Utilities");
        MERCHANT_MAP.put("TATA BROADBAND",  "Utilities");

        // ── Insurance ────────────────────────────────────────────────────────
        MERCHANT_MAP.put("ICICI LOMBARD",   "Insurance");
        MERCHANT_MAP.put("HDFC LIFE",       "Insurance");
        MERCHANT_MAP.put("HDFC ERGO",       "Insurance");
        MERCHANT_MAP.put("SBI LIFE",        "Insurance");
        MERCHANT_MAP.put("BAJAJ ALLIANZ",   "Insurance");
        MERCHANT_MAP.put("MAX LIFE",        "Insurance");
        MERCHANT_MAP.put("TATA AIA",        "Insurance");
        MERCHANT_MAP.put("KOTAK LIFE",      "Insurance");
        MERCHANT_MAP.put("BIRLA SUN",       "Insurance");
        MERCHANT_MAP.put("EXIDE LIFE",      "Insurance");
        MERCHANT_MAP.put("STAR HEALTH",     "Insurance");
        MERCHANT_MAP.put("NIVA BUPA",       "Insurance");
        MERCHANT_MAP.put("CARE HEALTH",     "Insurance");
        MERCHANT_MAP.put("RELIANCE LIFE",   "Insurance");
        MERCHANT_MAP.put("LIC ",            "Insurance");
        MERCHANT_MAP.put("INSURANCE",       "Insurance");
        MERCHANT_MAP.put("INSUR",           "Insurance");

        // ── Investment & Mutual Funds ─────────────────────────────────────────
        MERCHANT_MAP.put("ZERODHA",         "Investment");
        MERCHANT_MAP.put("GROWW",           "Investment");
        MERCHANT_MAP.put("UPSTOX",          "Investment");
        MERCHANT_MAP.put("PAYTM MONEY",     "Investment");
        MERCHANT_MAP.put("ANGEL ONE",       "Investment");
        MERCHANT_MAP.put("ANGEL BROKING",   "Investment");
        MERCHANT_MAP.put("ICICIDIRECT",     "Investment");
        MERCHANT_MAP.put("HDFC SECURITIES", "Investment");
        MERCHANT_MAP.put("SBISECURITIES",   "Investment");
        MERCHANT_MAP.put("5PAISA",          "Investment");
        MERCHANT_MAP.put("MUTUAL FUND",     "Investment");
        MERCHANT_MAP.put("MF SIP",          "Investment");
        MERCHANT_MAP.put("CAMS",            "Investment");
        MERCHANT_MAP.put("KARVY",           "Investment");
        MERCHANT_MAP.put("BSE STARMF",      "Investment");
        MERCHANT_MAP.put("MFUTILS",         "Investment");

        // ── Education ────────────────────────────────────────────────────────
        MERCHANT_MAP.put("BYJU",            "Education");
        MERCHANT_MAP.put("UNACADEMY",       "Education");
        MERCHANT_MAP.put("UDEMY",           "Education");
        MERCHANT_MAP.put("VEDANTU",         "Education");
        MERCHANT_MAP.put("WHITEHAT",        "Education");
        MERCHANT_MAP.put("UPGRAD",          "Education");
        MERCHANT_MAP.put("COURSERA",        "Education");
        MERCHANT_MAP.put("SCHOOL FEE",      "Education");
        MERCHANT_MAP.put("COLLEGE FEE",     "Education");
        MERCHANT_MAP.put("TUITION",         "Education");

        // ── Gaming & Fantasy Sports ───────────────────────────────────────────
        MERCHANT_MAP.put("DREAM11",         "Gaming & Fantasy");
        MERCHANT_MAP.put("MPL",             "Gaming & Fantasy");
        MERCHANT_MAP.put("WINZO",           "Gaming & Fantasy");
        MERCHANT_MAP.put("GAMES24X7",       "Gaming & Fantasy");
        MERCHANT_MAP.put("RUMMYCIRCLE",     "Gaming & Fantasy");
        MERCHANT_MAP.put("MY11CIRCLE",      "Gaming & Fantasy");

        // ── Bank Charges & Tax ────────────────────────────────────────────────
        MERCHANT_MAP.put("ANNUAL FEE",      "Bank Charges");
        MERCHANT_MAP.put("MAINTENANCE CHG", "Bank Charges");
        MERCHANT_MAP.put("INT CHARGED",     "Bank Charges");
        MERCHANT_MAP.put("SERVICE CHARGE",  "Bank Charges");
        MERCHANT_MAP.put("PROCESSING FEE",  "Bank Charges");
        MERCHANT_MAP.put("LATE FEE",        "Bank Charges");
        MERCHANT_MAP.put("PENALTY",         "Bank Charges");
        MERCHANT_MAP.put("GST",             "Tax");
        MERCHANT_MAP.put("TDS",             "Tax");
        MERCHANT_MAP.put("INCOME TAX",      "Tax");
        MERCHANT_MAP.put("ADVANCE TAX",     "Tax");
    }

    private static final int[] KEY_DATES = {1, 5, 10, 15, 20, 25, 30};

    // ─────────────────────────────────────────────────────────────────────────

    public AnalysisResult analyse(List<Transaction> transactions) {
        if (transactions == null || transactions.isEmpty()) {
            throw new IllegalStateException("No transactions to analyse.");
        }

        List<Transaction> sorted = transactions.stream()
            .sorted(Comparator.comparing(Transaction::getDate))
            .toList();

        Map<YearMonth, KeyDateBalance> keyDateBalances = buildKeyDateBalances(sorted);

        return AnalysisResult.builder()
            .transactions(sorted)
            .monthlySummaries(buildMonthlySummaries(sorted))
            .monthlyAmb(buildMonthlyAmb(sorted))
            .overallAmb(buildOverallAmb(sorted))
            .salaryCredits(detectSalary(sorted))
            .emiDeductions(detectEmis(sorted))
            .loanDetails(detectLoanDetails(detectEmis(sorted)))
            .cashTransactions(detectCash(sorted))
            .bounceReturns(detectBounces(sorted))
            .merchantCategories(categoriseMerchants(sorted))
            .keyDateBalances(keyDateBalances)
            .overallKeyDateAvg(buildOverallKeyDateAvg(keyDateBalances))
            .build();
    }

    // ── Monthly summaries ─────────────────────────────────────────────────────

    private Map<YearMonth, MonthlySummary> buildMonthlySummaries(List<Transaction> txns) {
        Map<YearMonth, List<Transaction>> byMonth = txns.stream()
            .collect(Collectors.groupingBy(t -> YearMonth.from(t.getDate()), TreeMap::new, Collectors.toList()));

        Map<YearMonth, MonthlySummary> result = new TreeMap<>();
        for (Map.Entry<YearMonth, List<Transaction>> e : byMonth.entrySet()) {
            BigDecimal credits = e.getValue().stream()
                .filter(Transaction::isCredit)
                .map(Transaction::getCredit)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal debits = e.getValue().stream()
                .filter(Transaction::isDebit)
                .map(Transaction::getDebit)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal closing = e.getValue().get(e.getValue().size() - 1).getBalance();

            result.put(e.getKey(), MonthlySummary.builder()
                .totalCredits(credits)
                .totalDebits(debits)
                .closingBalance(closing != null ? closing : BigDecimal.ZERO)
                .transactionCount(e.getValue().size())
                .build());
        }
        return result;
    }

    // ── Average Monthly Balance ───────────────────────────────────────────────

    private Map<YearMonth, BigDecimal> buildMonthlyAmb(List<Transaction> sorted) {
        if (sorted.isEmpty()) return Collections.emptyMap();
        Map<YearMonth, BigDecimal> result = new TreeMap<>();
        Map<YearMonth, List<Transaction>> byMonth = sorted.stream()
            .collect(Collectors.groupingBy(t -> YearMonth.from(t.getDate()), TreeMap::new, Collectors.toList()));
        for (Map.Entry<YearMonth, List<Transaction>> e : byMonth.entrySet()) {
            YearMonth ym = e.getKey();
            result.put(ym, computeAmb(sorted, ym.atDay(1), ym.atEndOfMonth()));
        }
        return result;
    }

    private BigDecimal buildOverallAmb(List<Transaction> sorted) {
        if (sorted.isEmpty()) return BigDecimal.ZERO;
        return computeAmb(sorted, sorted.get(0).getDate(), sorted.get(sorted.size() - 1).getDate());
    }

    private BigDecimal computeAmb(List<Transaction> sortedAll, LocalDate start, LocalDate end) {
        BigDecimal totalBalance = BigDecimal.ZERO;
        int days = 0;
        BigDecimal currentBalance = sortedAll.get(0).getBalance();
        int txnIdx = 0;
        LocalDate day = start;
        while (!day.isAfter(end)) {
            while (txnIdx < sortedAll.size() && !sortedAll.get(txnIdx).getDate().isAfter(day)) {
                BigDecimal b = sortedAll.get(txnIdx).getBalance();
                if (b != null) currentBalance = b;
                txnIdx++;
            }
            totalBalance = totalBalance.add(currentBalance);
            days++;
            day = day.plusDays(1);
        }
        return days == 0 ? BigDecimal.ZERO
            : totalBalance.divide(BigDecimal.valueOf(days), 2, RoundingMode.HALF_UP);
    }

    // ── Key-date balances ─────────────────────────────────────────────────────

    private Map<YearMonth, KeyDateBalance> buildKeyDateBalances(List<Transaction> sorted) {
        Map<YearMonth, KeyDateBalance> result = new TreeMap<>();
        Map<YearMonth, List<Transaction>> byMonth = sorted.stream()
            .collect(Collectors.groupingBy(t -> YearMonth.from(t.getDate()), TreeMap::new, Collectors.toList()));
        for (YearMonth ym : byMonth.keySet()) {
            Map<Integer, BigDecimal> dateBalances = new LinkedHashMap<>();
            for (int keyDate : KEY_DATES) {
                LocalDate target = ym.atDay(Math.min(keyDate, ym.lengthOfMonth()));
                dateBalances.put(keyDate, getBalanceAsOf(sorted, target));
            }
            BigDecimal avg = dateBalances.values().stream()
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(BigDecimal.valueOf(KEY_DATES.length), 2, RoundingMode.HALF_UP);
            result.put(ym, KeyDateBalance.builder()
                .dateBalances(dateBalances)
                .averageBalance(avg)
                .build());
        }
        return result;
    }

    private BigDecimal buildOverallKeyDateAvg(Map<YearMonth, KeyDateBalance> keyDateBalances) {
        if (keyDateBalances.isEmpty()) return BigDecimal.ZERO;
        BigDecimal total = keyDateBalances.values().stream()
            .map(KeyDateBalance::getAverageBalance)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        return total.divide(BigDecimal.valueOf(keyDateBalances.size()), 2, RoundingMode.HALF_UP);
    }

    private BigDecimal getBalanceAsOf(List<Transaction> sorted, LocalDate date) {
        BigDecimal balance = BigDecimal.ZERO;
        for (Transaction t : sorted) {
            if (t.getDate().isAfter(date)) break;
            if (t.getBalance() != null) balance = t.getBalance();
        }
        return balance;
    }

    // ── Salary detection ──────────────────────────────────────────────────────

    private List<Transaction> detectSalary(List<Transaction> txns) {
        // Pass 1: keyword match on credits above threshold
        Set<Transaction> result = txns.stream()
            .filter(Transaction::isCredit)
            .filter(t -> t.getCredit() != null && t.getCredit().compareTo(SALARY_THRESHOLD) >= 0)
            .filter(t -> containsKeyword(t.getDescription(), SALARY_KEYWORDS))
            .collect(Collectors.toCollection(LinkedHashSet::new));

        if (!result.isEmpty()) {
            log.info("Pass 1 (keyword match): detected {} salary credits", result.size());
        }

        // Pass 2: recurring monthly credit with no keyword — catches employer NEFT/RTGS
        List<Transaction> recurring = detectRecurringSalary(txns);
        if (!recurring.isEmpty()) {
            log.info("Pass 2 (recurring): detected {} salary credits", recurring.size());
            result.addAll(recurring);
        }

        return result.stream()
            .sorted(Comparator.comparing(Transaction::getDate))
            .toList();
    }

    /**
     * Groups large credits by rounded amount (nearest 500) to cluster salary-sized
     * transactions that vary slightly month-to-month (bonuses, tax deductions).
     *
     * A group qualifies as salary if:
     *   1. It has exactly ONE credit per month in ≥ 2 distinct months (salary comes once a month)
     *   2. All amounts are within 10% of the group median (wider window for variable-pay employees)
     *
     * FIX vs original:
     *   - withinFivePercent was asymmetric (used `a` as the base, so a<b and b<a gave different results)
     *   - Original added ALL large credits whenever any pair matched, pulling in unrelated large transfers
     *   - New version: groups by median proximity, enforces one-per-month rule
     */
    private List<Transaction> detectRecurringSalary(List<Transaction> txns) {
        // Collect large credits, grouped by month
        Map<YearMonth, List<Transaction>> byMonth = txns.stream()
            .filter(Transaction::isCredit)
            .filter(t -> t.getCredit() != null && t.getCredit().compareTo(SALARY_THRESHOLD) >= 0)
            .collect(Collectors.groupingBy(t -> YearMonth.from(t.getDate()), TreeMap::new, Collectors.toList()));

        if (byMonth.size() < 2) return Collections.emptyList();

        List<Transaction> allLargeCredits = byMonth.values().stream()
            .flatMap(List::stream)
            .collect(Collectors.toList());

        // Sort amounts to compute median easily
        List<BigDecimal> sortedAmts = allLargeCredits.stream()
            .map(Transaction::getCredit)
            .sorted()
            .collect(Collectors.toList());

        int n = sortedAmts.size();
        BigDecimal median = (n % 2 == 1)
                ? sortedAmts.get(n / 2)
                : sortedAmts.get(n / 2 - 1).add(sortedAmts.get(n / 2))
                            .divide(new BigDecimal("2"), 2, RoundingMode.HALF_UP);

        // Cluster transactions within 10% of the median
        List<Transaction> cluster = allLargeCredits.stream()
            .filter(t -> withinPercent(t.getCredit(), median, 10))
            .collect(Collectors.toList());

        // Group clustered transactions by month
        Map<YearMonth, List<Transaction>> clusterByMonth = cluster.stream()
            .collect(Collectors.groupingBy(t -> YearMonth.from(t.getDate())));

        // Salary rule: appears in ≥ 2 months AND only once per month
        // (multiple large credits in the same month = not a salary month)
        long qualifyingMonths = clusterByMonth.values().stream()
            .filter(list -> list.size() == 1)
            .count();

        if (qualifyingMonths >= 2) {
            // Return only the months where exactly one cluster credit appeared
            return clusterByMonth.values().stream()
                .filter(list -> list.size() == 1)
                .map(list -> list.get(0))
                .collect(Collectors.toList());
        }

        return Collections.emptyList();
    }

    /**
     * FIX: symmetric percentage check — uses the average of a and b as the base,
     * so withinPercent(a, b, 10) == withinPercent(b, a, 10) always.
     */
    private boolean withinPercent(BigDecimal a, BigDecimal b, int pct) {
        if (a == null || b == null) return false;
        BigDecimal avg = a.add(b).divide(BigDecimal.valueOf(2), 2, RoundingMode.HALF_UP);
        if (avg.compareTo(BigDecimal.ZERO) == 0) return a.compareTo(b) == 0;
        BigDecimal tolerance = avg.multiply(BigDecimal.valueOf(pct)).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        return a.subtract(b).abs().compareTo(tolerance) <= 0;
    }

    // ── EMI / Loan detection ──────────────────────────────────────────────────

    private List<Transaction> detectEmis(List<Transaction> txns) {
        List<Transaction> result = txns.stream()
            .filter(Transaction::isDebit)
            .filter(t -> t.getDebit() != null && t.getDebit().compareTo(EMI_MIN_AMOUNT) >= 0)
            .filter(t -> containsKeyword(t.getDescription(), EMI_KEYWORDS))
            .toList();
        if (!result.isEmpty()) {
            log.info("Detected {} EMI deductions", result.size());
        }
        return result;
    }

    private List<LoanDetail> detectLoanDetails(List<Transaction> emis) {
        // Group EMI transactions by lender key so each distinct loan is one entry
        Map<String, List<Transaction>> grouped = new LinkedHashMap<>();
        for (Transaction t : emis) {
            String key = lenderGroupKey(t.getDescription());
            grouped.computeIfAbsent(key, k -> new ArrayList<>()).add(t);
        }

        List<LoanDetail> details = new ArrayList<>();
        for (Map.Entry<String, List<Transaction>> entry : grouped.entrySet()) {
            List<Transaction> payments = entry.getValue();
            if (payments.isEmpty()) continue;

            BigDecimal totalPaid = payments.stream()
                .map(Transaction::getDebit).filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal avgEmi = totalPaid.divide(
                new BigDecimal(payments.size()), 2, RoundingMode.HALF_UP);

            // Most common payment day of month
            Map<Integer, Long> dayFreq = payments.stream()
                .filter(t -> t.getDate() != null)
                .collect(Collectors.groupingBy(
                    t -> t.getDate().getDayOfMonth(), Collectors.counting()));
            int payDay = dayFreq.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey).orElse(0);

            // Month → list of payment dates
            Map<YearMonth, List<LocalDate>> monthlyDates = new TreeMap<>();
            for (Transaction t : payments) {
                if (t.getDate() == null) continue;
                monthlyDates
                    .computeIfAbsent(YearMonth.from(t.getDate()), k -> new ArrayList<>())
                    .add(t.getDate());
            }

            String desc = payments.get(0).getDescription();
            details.add(LoanDetail.builder()
                .lenderName(resolveLenderName(desc))
                .loanCategory(resolveLoanCategory(desc))
                .avgEmiAmount(avgEmi)
                .paymentDayOfMonth(payDay)
                .totalPaid(totalPaid)
                .firstPaymentDate(payments.get(0).getDate())
                .lastPaymentDate(payments.get(payments.size() - 1).getDate())
                .paymentCount(payments.size())
                .monthlyPaymentDates(monthlyDates)
                .payments(payments)
                .build());
        }

        log.info("Detected {} distinct loan/EMI groups", details.size());
        grouped.forEach((k, v) -> log.info("  Group key='{}' → {} txns, sample='{}'",
            k, v.size(), v.get(0).getDescription()));
        return details;
    }

    private static final java.util.regex.Pattern CORP_SUFFIX =
        java.util.regex.Pattern.compile(
            "\\b(LTD|LIMITED|PVT|PRIVATE|INDIA|BANK|FINANCE|FINANCIAL|SERVICES|SERVICE|" +
            "CORP|CORPORATION|HOLDINGS|GROUP|CO)\\b", java.util.regex.Pattern.CASE_INSENSITIVE);

    /** Strips leading time-of-day noise that Union Bank descriptions can start with, e.g. "am ", "pm ", "7 pm " */
    private static final java.util.regex.Pattern TIME_PREFIX =
        java.util.regex.Pattern.compile(
            "^(\\d{1,2}\\s+)?(am|pm)\\s+", java.util.regex.Pattern.CASE_INSENSITIVE);

    private String normaliseDesc(String description) {
        if (description == null) return "";
        return TIME_PREFIX.matcher(description.trim()).replaceFirst("").trim();
    }

    private String lenderGroupKey(String description) {
        if (description == null) return "Unknown";
        String desc  = normaliseDesc(description);
        String upper = desc.toUpperCase();
        for (Map.Entry<String, String> e : LENDER_NAMES.entrySet()) {
            if (upper.contains(e.getKey())) return e.getValue();
        }
        // Fallback: remove corporate suffixes, digits, and special chars,
        // then anchor on the first 3 meaningful words for a stable group key.
        String cleaned = CORP_SUFFIX.matcher(upper).replaceAll(" ")
                                    .replaceAll("[\\d/@._\\-/]+", " ")
                                    .replaceAll("\\s{2,}", " ").trim();
        return java.util.Arrays.stream(cleaned.split("\\s+"))
                               .filter(w -> !w.isEmpty())
                               .limit(3)
                               .collect(Collectors.joining(" "));
    }

    private String resolveLenderName(String description) {
        if (description == null) return "Unknown Lender";
        String desc  = normaliseDesc(description);
        String upper = desc.toUpperCase();
        for (Map.Entry<String, String> e : LENDER_NAMES.entrySet()) {
            if (upper.contains(e.getKey())) return e.getValue();
        }
        // Strip common channel prefixes (and the ACH-DR / NACH-DR sub-prefix) then return
        String cleaned = desc
                .replaceAll("(?i)^(ACH|BIL|NACH|ECS|MANDATE|NEFT|IMPS|UPI|CMS)[/\\-](DR[/\\-]|DEBIT[/\\-]|DB[/\\-])?", "")
                .replaceAll("[\\d]{6,}", "").replaceAll("[/\\-_]{2,}", " ").trim();
        return cleaned.substring(0, Math.min(40, cleaned.length())).trim();
    }

    private String resolveLoanCategory(String description) {
        if (description == null) return "Other Loan";
        String upper = description.toUpperCase();
        for (Map.Entry<String, String> e : LOAN_CATEGORIES.entrySet()) {
            if (upper.contains(e.getKey())) return e.getValue();
        }
        if (upper.contains("NACH") || upper.contains("ACH/") || upper.contains("ECS")) {
            return "Loan EMI (Mandate)";
        }
        return "Other Loan";
    }

    private List<Transaction> detectCash(List<Transaction> txns) {
        List<Transaction> result = txns.stream()
            .filter(t -> containsKeyword(t.getDescription(), CASH_KEYWORDS))
            .filter(t -> !containsKeyword(t.getDescription(), EMI_KEYWORDS))
            .toList();
        if (!result.isEmpty()) {
            log.info("Detected {} cash transactions", result.size());
        }
        return result;
    }

    private List<Transaction> detectBounces(List<Transaction> txns) {
        List<Transaction> result = txns.stream()
            .filter(t -> containsKeyword(t.getDescription(), BOUNCE_KEYWORDS))
            .toList();
        if (!result.isEmpty()) {
            log.info("Detected {} bounce/return transactions", result.size());
        }
        return result;
    }

    // ── Merchant / category grouping ──────────────────────────────────────────

    private Map<String, MerchantCategory> categoriseMerchants(List<Transaction> txns) {
        Map<String, List<Transaction>> byCategory = new TreeMap<>();
        for (Transaction t : txns) {
            if (!t.isDebit()) continue;
            String cat = classifyMerchant(t.getDescription());
            byCategory.computeIfAbsent(cat, k -> new ArrayList<>()).add(t);
        }
        Map<String, MerchantCategory> result = new LinkedHashMap<>();
        byCategory.entrySet().stream()
            .sorted((a, b) -> Long.compare(b.getValue().size(), a.getValue().size()))
            .forEach(e -> {
                BigDecimal total = e.getValue().stream()
                    .map(Transaction::getDebit)
                    .filter(Objects::nonNull)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
                result.put(e.getKey(), MerchantCategory.builder()
                    .category(e.getKey())
                    .count(e.getValue().size())
                    .totalAmount(total)
                    .build());
            });
        return result;
    }

    private String classifyMerchant(String description) {
        if (description == null) return "Miscellaneous";
        String upper = description.toUpperCase();
        for (Map.Entry<String, String> entry : MERCHANT_MAP.entrySet()) {
            if (upper.contains(entry.getKey())) return entry.getValue();
        }
        return "Miscellaneous";
    }

    // ── Utility ───────────────────────────────────────────────────────────────

    private boolean containsKeyword(String text, List<String> keywords) {
        if (text == null) return false;
        String upper = text.toUpperCase();
        return keywords.stream().anyMatch(upper::contains);
    }
}