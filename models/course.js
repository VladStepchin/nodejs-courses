const { v4: uuidv4 } = require('uuid')
const fs = require('fs');
const path = require('path');

class Course {
    constructor(_title, _price, _image) {
        this.title = _title
        this.price = _price
        this.image = _image
        this.id = uuidv4();
    }

    async save() {
        const courses = await Course.getAll();

        courses.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) reject(err)
                    else {
                        resolve()
                    }
                })
        })
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            image: this.image,
            id: this.id
        }
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }
    static async getById(id) {
        const courses = await Course.getAll()
        return courses.find(c => c.id === id)
    }

    static async update(course) {
        const courses = await Course.getAll()
        const index = courses.findIndex(c => c.id === course.id)
        courses[index] = course;

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) reject(err)
                    else {
                        resolve()
                    }
                })
        })
    }
    async makeBackup() {
        let backup = await Course.getAll();

        fs.writeFile(path.join(__dirname, '..', 'data',
                `${new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}-backup.json`),
            JSON.stringify(backup), (err) => {
                if (err) throw err
            })
    }
}

module.exports = Course;