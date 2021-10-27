const fs = require('fs');
const path = require('path');

module.exports = class UserRepository {
    /**
     * file location on the register-server
     */
    fileLoc;

    /**
     * Constructor with file where to save user-data
     * @param fileName
     */
    constructor(fileName) {
        this.fileLoc = path.resolve(fileName);
    }

    /**
     * Read data from file
     * @returns Promise for reading data
     */
    read() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileLoc, 'utf8',
                (error, data) => {
                    if (error) {
                        reject(`Error ${error}`);
                    } else {
                        try {
                            resolve(JSON.parse(data));
                        } catch (e) {
                            console.error('Invalid JSON in file');
                        }
                    }
                })
        });
    }

    /**
     * Save (or write) data in file
     * @param data
     * @returns Promise with saved data
     */
    save(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.fileLoc,
                JSON.stringify(data, null, 2),
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
        });
    }
}
