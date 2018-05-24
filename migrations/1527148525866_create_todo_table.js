module.exports = {
    "up": "CREATE TABLE `todo`( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(100) NOT NULL, `done` BOOLEAN NOT NULL DEFAULT FALSE, PRIMARY KEY (`id`) )",
    "down": "DROP TABLE `todo`"
}