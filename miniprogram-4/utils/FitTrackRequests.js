class FitTrackRequests{
	static url_base="http"
	static sport_get_all = "da"
	static diet_get_all = ""
	static body_get_all = ""
	static sport_add = ""
	static diet_add = ""
	static body_add = ""
	static login = ""
	static signup = ""
	
	constructor(name){
		this.name = name
		this.url_base="http"
		this.sport_get_all = "da"
		this.diet_get_all = ""
		this.body_get_all = ""
		this.sport_add = ""
		this.diet_add = ""
		this.body_add = ""
		this.login = ""
		this.signup = ""
	}
	static getURL_SportGetAll(){
		return FitTrackRequests.url_base + FitTrackRequests.sport_get_all
	}
	static getURL_DietGetAll(){
		return this.url_base + this.diet_get_all
	}
	static getURL_BodyGetAll(){
		return this.url_base + this.body_get_all
	}
	static getURL_SportAdd(){
		return this.url_base + this.sport_add
	}
	static getURL_DietAdd(){
		return this.url_base + this.diet_add
	}
	static getURL_BodyAdd(){
		return this.url_base + this.body_add
	}
}
module.exports = FitTrackRequests