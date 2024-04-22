-- CreateEnum
CREATE TYPE "Activity" AS ENUM ('LIGHT', 'MODERATE', 'HIGH', 'EXTREME');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('LOSE', 'MANTAIN', 'GAIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "image" TEXT,
    "prime" BOOLEAN NOT NULL DEFAULT true,
    "survey" BOOLEAN NOT NULL DEFAULT false,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "age" INTEGER,
    "activity" "Activity",
    "exclude" TEXT,
    "sex" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "goal" "Goal" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "mealPlanId" INTEGER NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "summary" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "calories" INTEGER,
    "fat" INTEGER,
    "carbohydrates" INTEGER,
    "protein" INTEGER,
    "ingredients" TEXT[],

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_title_key" ON "Recipe"("title");

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "User" (id, email, fullName, prime)
VALUES ('782350ec-c20a-4b32-80f5-dc13de4d0722', '838819@unizar.es', 'Álvaro de Francisco', true);

INSERT INTO "User" (id, email, fullName, prime)
VALUES ('753f1d52-573e-4e3f-b312-a0221bcac858', 'smartbitesisinf@gmail.com', 'smart bites', false);