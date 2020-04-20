const fs = require('fs')

export default function(req, res, next) {
    if (req.path === '/setTopicDone') {
        const topicLink = req.query.link
        let data = fs.readFileSync(__dirname + '/../static/datas.json')
        data = JSON.parse(data)
        const topicId = data.findIndex(el => el.link === topicLink)
        data[topicId] = Object.assign(data[topicId], {
            done: !data[topicId].done
        })
        fs.writeFile(
            __dirname + '/../static/datas.json',
            JSON.stringify(data, null, 4),
            err => {
                if (err) console.log(err + data)
            }
        )
        console.log('asdd')
        return
    }

    next()
}
