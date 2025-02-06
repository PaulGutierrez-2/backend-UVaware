-- CreateTable
CREATE TABLE `recomendations` (
    `idrecomendations` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(25) NULL,
    `description` VARCHAR(200) NULL,
    `img` VARCHAR(255) NULL,

    PRIMARY KEY (`idrecomendations`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
