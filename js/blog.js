var blog = function () {
    var articles = [
        {
            "id": 1,
            "title": "Backup MongoDB every night in NodeJS",
            "url": "/blogs/backup_mongodb.md"
        }
    ];

    function articleById(id) {
        return content[id] || content[0];   
    }

    return function () {
        return Object.freeze({
            getArticle: articleById,
            articles: articles
        });
    }();
}();