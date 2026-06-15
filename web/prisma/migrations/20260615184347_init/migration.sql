-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('VISITOR', 'INVESTOR', 'ADMIN', 'GENERAL_PARTNER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING_INVITE', 'ACTIVE', 'SUSPENDED', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "InvestorType" AS ENUM ('INDIVIDUAL', 'JOINT', 'ENTITY', 'TRUST', 'SMSF', 'INSTITUTIONAL');

-- CreateEnum
CREATE TYPE "AccreditationStatus" AS ENUM ('UNVERIFIED', 'PENDING_REVIEW', 'ACCREDITED', 'REJECTED');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('NOT_STARTED', 'SUBMITTED', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "Jurisdiction" AS ENUM ('KENYA', 'AUSTRALIA', 'OTHER');

-- CreateEnum
CREATE TYPE "Sector" AS ENUM ('REAL_ESTATE', 'TECH_STARTUPS', 'MANUFACTURING', 'CRYPTO_STOCKS', 'MINING_EXPLORATION', 'FASHION_CLOTHING', 'LOGISTICS_TRANSPORT', 'FRANCHISING_LICENSING', 'OTHER');

-- CreateEnum
CREATE TYPE "FundStatus" AS ENUM ('FUNDRAISING', 'INVESTING', 'HARVESTING', 'CLOSED', 'WOUND_DOWN');

-- CreateEnum
CREATE TYPE "CommitmentStatus" AS ENUM ('SOFT_CIRCLED', 'SIGNED', 'ACTIVE', 'DEFAULTED', 'TRANSFERRED', 'CLOSED');

-- CreateEnum
CREATE TYPE "DealStage" AS ENUM ('SOURCED', 'SCREENING', 'DUE_DILIGENCE', 'IC_REVIEW', 'TERM_SHEET', 'CLOSING', 'INVESTED', 'PASSED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "PortfolioStatus" AS ENUM ('ACTIVE', 'EXITED', 'WRITTEN_OFF', 'IPO', 'ACQUIRED');

-- CreateEnum
CREATE TYPE "InvestmentType" AS ENUM ('EQUITY', 'SAFE', 'CONVERTIBLE_NOTE', 'DEBT', 'REAL_ASSET', 'TOKEN');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('SUBSCRIPTION_AGREEMENT', 'LP_AGREEMENT', 'KYC_AML', 'CAPITAL_CALL_NOTICE', 'DISTRIBUTION_NOTICE', 'QUARTERLY_REPORT', 'ANNUAL_REPORT', 'TAX_DOCUMENT', 'FINANCIAL_STATEMENT', 'PITCH_DECK', 'TERM_SHEET', 'LEGAL', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentVisibility" AS ENUM ('PRIVATE', 'FUND_LPS', 'ALL_INVESTORS', 'INTERNAL');

-- CreateEnum
CREATE TYPE "CapitalCallStatus" AS ENUM ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PARTIAL', 'PAID', 'OVERDUE', 'WAIVED');

-- CreateEnum
CREATE TYPE "DistributionType" AS ENUM ('RETURN_OF_CAPITAL', 'CAPITAL_GAIN', 'DIVIDEND', 'INTEREST', 'RECALLABLE');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('QUARTERLY', 'ANNUAL', 'CAPITAL_ACCOUNT_STATEMENT', 'NAV_STATEMENT', 'PERFORMANCE', 'TAX', 'AD_HOC');

-- CreateEnum
CREATE TYPE "CommunicationType" AS ENUM ('ANNOUNCEMENT', 'DIRECT_MESSAGE', 'NEWSLETTER', 'ALERT');

-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('GENERAL_CONTACT', 'SPECIAL_INQUIRY', 'INVESTOR_INTEREST', 'PARTNERSHIP');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('CAPITAL_CALL', 'DISTRIBUTION', 'DOCUMENT', 'REPORT', 'MESSAGE', 'KYC', 'SYSTEM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "authUserId" UUID,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'VISITOR',
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING_INVITE',
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "invitedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investor_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "InvestorType" NOT NULL DEFAULT 'INDIVIDUAL',
    "legalName" TEXT NOT NULL,
    "displayName" TEXT,
    "taxId" TEXT,
    "jurisdiction" "Jurisdiction" NOT NULL DEFAULT 'OTHER',
    "countryCode" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "accreditation" "AccreditationStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "accreditationExpiry" TIMESTAMP(3),
    "kycStatus" "KycStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "kycCompletedAt" TIMESTAMP(3),
    "riskProfile" TEXT,
    "bankingDetailsRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "vintageYear" INTEGER,
    "status" "FundStatus" NOT NULL DEFAULT 'FUNDRAISING',
    "strategy" TEXT,
    "thesis" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "targetSize" DECIMAL(18,2),
    "hardCap" DECIMAL(18,2),
    "totalCommitted" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "totalCalled" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "totalDistributed" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "managementFeePct" DECIMAL(5,2),
    "carryPct" DECIMAL(5,2),
    "hurdleRatePct" DECIMAL(5,2),
    "vintageOpenAt" TIMESTAMP(3),
    "finalCloseAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fund_commitments" (
    "id" TEXT NOT NULL,
    "fundId" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "commitmentAmount" DECIMAL(18,2) NOT NULL,
    "calledAmount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "distributedAmount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "ownershipPct" DECIMAL(7,4),
    "status" "CommitmentStatus" NOT NULL DEFAULT 'SOFT_CIRCLED',
    "signedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fund_commitments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "sector" "Sector" NOT NULL DEFAULT 'OTHER',
    "stage" "DealStage" NOT NULL DEFAULT 'SOURCED',
    "description" TEXT,
    "source" TEXT,
    "geography" TEXT,
    "askAmount" DECIMAL(18,2),
    "proposedAmount" DECIMAL(18,2),
    "preMoneyValuation" DECIMAL(18,2),
    "probabilityPct" DECIMAL(5,2),
    "expectedCloseAt" TIMESTAMP(3),
    "passedReason" TEXT,
    "fundId" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deal_notes" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "authorId" TEXT,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deal_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sector" "Sector" NOT NULL DEFAULT 'OTHER',
    "status" "PortfolioStatus" NOT NULL DEFAULT 'ACTIVE',
    "description" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "headquarters" TEXT,
    "foundedYear" INTEGER,
    "dealId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investments" (
    "id" TEXT NOT NULL,
    "fundId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "type" "InvestmentType" NOT NULL DEFAULT 'EQUITY',
    "round" TEXT,
    "amountInvested" DECIMAL(18,2) NOT NULL,
    "ownershipPct" DECIMAL(7,4),
    "shareCount" DECIMAL(18,4),
    "entryValuation" DECIMAL(18,2),
    "currentValuation" DECIMAL(18,2),
    "realizedValue" DECIMAL(18,2),
    "investedAt" TIMESTAMP(3),
    "exitedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "valuations" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "valuation" DECIMAL(18,2) NOT NULL,
    "asOfDate" TIMESTAMP(3) NOT NULL,
    "methodology" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "valuations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capital_calls" (
    "id" TEXT NOT NULL,
    "fundId" TEXT NOT NULL,
    "callNumber" INTEGER NOT NULL,
    "status" "CapitalCallStatus" NOT NULL DEFAULT 'DRAFT',
    "totalAmount" DECIMAL(18,2) NOT NULL,
    "purpose" TEXT,
    "issuedAt" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capital_calls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capital_call_line_items" (
    "id" TEXT NOT NULL,
    "capitalCallId" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "amountDue" DECIMAL(18,2) NOT NULL,
    "amountPaid" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capital_call_line_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distributions" (
    "id" TEXT NOT NULL,
    "fundId" TEXT NOT NULL,
    "distNumber" INTEGER NOT NULL,
    "type" "DistributionType" NOT NULL DEFAULT 'RETURN_OF_CAPITAL',
    "totalAmount" DECIMAL(18,2) NOT NULL,
    "recordDate" TIMESTAMP(3),
    "paymentDate" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "distributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_line_items" (
    "id" TEXT NOT NULL,
    "distributionId" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "distribution_line_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "DocumentCategory" NOT NULL DEFAULT 'OTHER',
    "visibility" "DocumentVisibility" NOT NULL DEFAULT 'PRIVATE',
    "storagePath" TEXT NOT NULL,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 1,
    "uploadedById" TEXT,
    "investorId" TEXT,
    "fundId" TEXT,
    "dealId" TEXT,
    "companyId" TEXT,
    "capitalCallId" TEXT,
    "distributionId" TEXT,
    "reportId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "fundId" TEXT NOT NULL,
    "type" "ReportType" NOT NULL DEFAULT 'QUARTERLY',
    "title" TEXT NOT NULL,
    "periodLabel" TEXT,
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "summary" TEXT,
    "navValue" DECIMAL(18,2),
    "irrPct" DECIMAL(7,4),
    "moic" DECIMAL(7,4),
    "dpi" DECIMAL(7,4),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_recipients" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3),

    CONSTRAINT "report_recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communications" (
    "id" TEXT NOT NULL,
    "type" "CommunicationType" NOT NULL DEFAULT 'ANNOUNCEMENT',
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "senderId" TEXT,
    "fundId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "communications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_recipients" (
    "id" TEXT NOT NULL,
    "communicationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "message_recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" TEXT NOT NULL,
    "type" "InquiryType" NOT NULL DEFAULT 'GENERAL_CONTACT',
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "sector" "Sector",
    "message" TEXT NOT NULL,
    "source" TEXT,
    "assignedToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'SYSTEM',
    "title" TEXT NOT NULL,
    "body" TEXT,
    "link" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_authUserId_key" ON "users"("authUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE UNIQUE INDEX "investor_profiles_userId_key" ON "investor_profiles"("userId");

-- CreateIndex
CREATE INDEX "investor_profiles_kycStatus_idx" ON "investor_profiles"("kycStatus");

-- CreateIndex
CREATE INDEX "investor_profiles_accreditation_idx" ON "investor_profiles"("accreditation");

-- CreateIndex
CREATE UNIQUE INDEX "funds_slug_key" ON "funds"("slug");

-- CreateIndex
CREATE INDEX "funds_status_idx" ON "funds"("status");

-- CreateIndex
CREATE INDEX "fund_commitments_status_idx" ON "fund_commitments"("status");

-- CreateIndex
CREATE UNIQUE INDEX "fund_commitments_fundId_investorId_key" ON "fund_commitments"("fundId", "investorId");

-- CreateIndex
CREATE INDEX "deals_stage_idx" ON "deals"("stage");

-- CreateIndex
CREATE INDEX "deals_sector_idx" ON "deals"("sector");

-- CreateIndex
CREATE INDEX "deal_notes_dealId_idx" ON "deal_notes"("dealId");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_companies_slug_key" ON "portfolio_companies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_companies_dealId_key" ON "portfolio_companies"("dealId");

-- CreateIndex
CREATE INDEX "portfolio_companies_sector_idx" ON "portfolio_companies"("sector");

-- CreateIndex
CREATE INDEX "portfolio_companies_status_idx" ON "portfolio_companies"("status");

-- CreateIndex
CREATE INDEX "investments_fundId_idx" ON "investments"("fundId");

-- CreateIndex
CREATE INDEX "investments_companyId_idx" ON "investments"("companyId");

-- CreateIndex
CREATE INDEX "valuations_companyId_asOfDate_idx" ON "valuations"("companyId", "asOfDate");

-- CreateIndex
CREATE INDEX "capital_calls_status_idx" ON "capital_calls"("status");

-- CreateIndex
CREATE UNIQUE INDEX "capital_calls_fundId_callNumber_key" ON "capital_calls"("fundId", "callNumber");

-- CreateIndex
CREATE INDEX "capital_call_line_items_paymentStatus_idx" ON "capital_call_line_items"("paymentStatus");

-- CreateIndex
CREATE UNIQUE INDEX "capital_call_line_items_capitalCallId_investorId_key" ON "capital_call_line_items"("capitalCallId", "investorId");

-- CreateIndex
CREATE UNIQUE INDEX "distributions_fundId_distNumber_key" ON "distributions"("fundId", "distNumber");

-- CreateIndex
CREATE UNIQUE INDEX "distribution_line_items_distributionId_investorId_key" ON "distribution_line_items"("distributionId", "investorId");

-- CreateIndex
CREATE INDEX "documents_category_idx" ON "documents"("category");

-- CreateIndex
CREATE INDEX "documents_visibility_idx" ON "documents"("visibility");

-- CreateIndex
CREATE INDEX "documents_investorId_idx" ON "documents"("investorId");

-- CreateIndex
CREATE INDEX "documents_fundId_idx" ON "documents"("fundId");

-- CreateIndex
CREATE INDEX "reports_fundId_type_idx" ON "reports"("fundId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "report_recipients_reportId_investorId_key" ON "report_recipients"("reportId", "investorId");

-- CreateIndex
CREATE INDEX "communications_type_idx" ON "communications"("type");

-- CreateIndex
CREATE UNIQUE INDEX "message_recipients_communicationId_userId_key" ON "message_recipients"("communicationId", "userId");

-- CreateIndex
CREATE INDEX "inquiries_type_idx" ON "inquiries"("type");

-- CreateIndex
CREATE INDEX "inquiries_status_idx" ON "inquiries"("status");

-- CreateIndex
CREATE INDEX "notifications_userId_readAt_idx" ON "notifications"("userId", "readAt");

-- CreateIndex
CREATE INDEX "audit_logs_entityType_entityId_idx" ON "audit_logs"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "audit_logs_actorId_idx" ON "audit_logs"("actorId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investor_profiles" ADD CONSTRAINT "investor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_commitments" ADD CONSTRAINT "fund_commitments_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "funds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_commitments" ADD CONSTRAINT "fund_commitments_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "investor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "funds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deal_notes" ADD CONSTRAINT "deal_notes_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "deals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_companies" ADD CONSTRAINT "portfolio_companies_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "deals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "portfolio_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valuations" ADD CONSTRAINT "valuations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "portfolio_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_calls" ADD CONSTRAINT "capital_calls_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "funds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_call_line_items" ADD CONSTRAINT "capital_call_line_items_capitalCallId_fkey" FOREIGN KEY ("capitalCallId") REFERENCES "capital_calls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_call_line_items" ADD CONSTRAINT "capital_call_line_items_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "investor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distributions" ADD CONSTRAINT "distributions_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "funds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distribution_line_items" ADD CONSTRAINT "distribution_line_items_distributionId_fkey" FOREIGN KEY ("distributionId") REFERENCES "distributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distribution_line_items" ADD CONSTRAINT "distribution_line_items_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "investor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "investor_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "funds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "deals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "portfolio_companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_capitalCallId_fkey" FOREIGN KEY ("capitalCallId") REFERENCES "capital_calls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_distributionId_fkey" FOREIGN KEY ("distributionId") REFERENCES "distributions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "funds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_recipients" ADD CONSTRAINT "report_recipients_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_recipients" ADD CONSTRAINT "report_recipients_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "investor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communications" ADD CONSTRAINT "communications_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_recipients" ADD CONSTRAINT "message_recipients_communicationId_fkey" FOREIGN KEY ("communicationId") REFERENCES "communications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_recipients" ADD CONSTRAINT "message_recipients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
