-- CreateTable
CREATE TABLE "public"."Url" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_hash_key" ON "public"."Url"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Url_originalUrl_key" ON "public"."Url"("originalUrl");
