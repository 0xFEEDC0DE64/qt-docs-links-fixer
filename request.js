chrome.webRequest.onBeforeRequest.addListener(function(details) {
    let url = details.url;

    for(expression of [
        /^https?:\/\/doc\.qt\.io\/qt-[0-9\.]+(.*)$/g,
        /^https?:\/\/doc\.qt\.io\/archives\/qt-[0-9\.]+(.*)$/g,
        /^https?:\/\/developer\.qt\.nokia\.com\/doc\/qt-[0-9\.]+(.*)$/g,
        /^https?:\/\/qt\.nokia\.com\/doc(.*)$/g,
        /^https?:\/\/doc\.qt\.nokia\.com\/(?:latest|stable|[0-9\.]+)(.*)$/g,
        /^https?:\/\/doc\.trolltech\.com\/[0-9\.]+(.*)$/g
    ]) {
        let match = expression.exec(url);
        if(match !== null) {
            return { redirectUrl: 'https://doc.qt.io/qt-5' + match[1] };
        };
    }

    {
        let match = /https?:\/\/bugreports\.qt\.nokia\.com\/(.*)$/g.exec(url);
        if(match !== null) {
            return { redirectUrl: 'https://bugreports.qt.io/' + match[1] };
        };
    }

    {
        let match = /https?:\/\/lists\.qt\.nokia\.com\/(.*)$/g.exec(url);
        if(match !== null) {
            return { redirectUrl: 'http://lists.qt-project.org\/' + match[1] };
        };
    }
}, {
    urls : ["<all_urls>"]
}, ["blocking"]);
