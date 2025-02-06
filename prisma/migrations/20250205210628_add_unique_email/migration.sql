-- CreateTable
CREATE TABLE `admin` (
    `idadmin` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`idadmin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `idarticles` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(25) NULL,
    `description` VARCHAR(200) NULL,
    `img` VARCHAR(100) NULL,

    PRIMARY KEY (`idarticles`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
