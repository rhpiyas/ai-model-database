
function endResponseWithJSON(res, data, status = 200) {
    res.writeHead(status, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
 
    res.end(JSON.stringify(data));
}
 
function endResponseWithText(res, text, status = 200) {
    res.writeHead(status, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
    });
 
    res.end(text);
}
 
function endResponseWithHTML(res, html, status = 200) {
    res.writeHead(status, {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*"
    });
 
    res.end(html);
}
 
module.exports = {
    endResponseWithJSON,
    endResponseWithText,
    endResponseWithHTML
};

