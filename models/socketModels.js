var crypto = require('crypto');

exports.convertSessionToViewModel = function (dbSession) {
	var session = null,
		getGravatar = function (emailAddress) {
			//x-domain jsonp profile data: http://en.gravatar.com/profile/9e64baef8549d829306f7e36140b3b2a.json?s=80&callback=jsonp_callback
			//img pic: http://www.gravatar.com/avatar/9e64baef8549d829306f7e36140b3b2a?s=80
			var hash = crypto.createHash('md5').update(emailAddress).digest("hex"); 
			return { 
				avatar: 'http://www.gravatar.com/avatar/' + hash, 
				profile: ' http://en.gravatar.com/profile/' + hash + '.json'
			};
		};
		
	if (dbSession === undefined || dbSession === null) {
		session = {
			emailAddress: null,
			sessionKey: null,
			documentId: null,
			gravatar: null
		};
	}
	else {
		session = {
			emailAddress: dbSession.emailAddress,
			sessionKey: dbSession.sessionKey,
			documentId: dbSession.documentId,
			gravatar: getGravatar(dbSession.emailAddress)
		};
	}
	return session;
};

exports.convertDocumentToViewModel = function (document) {
	var doc = {
		documentId:		document.documentId,
		text:			document.text
	};
	return doc;
};

exports.convertToDocumentChangeViewModel = function (document, emailAddress) {
	var change = {
		emailAddress:	emailAddress,
		text:			document.text
	};
	return change;
};