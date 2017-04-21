// 根据天气类型返回相关天气图标

/**
 * 天气类型表
 * 
 *  0:晴 1:多云 2:阴 3:阵雨 4:雷阵雨 5:雷阵雨伴有冰雹 6:雨夹雪 7:小雨 8:中雨 9:大雨 10:暴雨 11:大暴雨 12:特大暴雨 13:阵雪 14:小雪 15:中雪 
 *	16:大雪 17:暴雪 18:雾 19:冻雨 20:沙尘暴 21:小雨-中雨 22:中雨-大雨 23:大雨-暴雨 24:暴雨-大暴雨 25:大暴雨-特大暴雨 26:小雪-中雪 27:中雪-大雪 
 *	28:大雪-暴雪 29:浮尘 30:扬沙 31:强沙尘暴 32:霾
	 *
 */

let wtType = [
	 "\u{6674}", "\u{591a}\u{4e91}", "\u{9634}", "\u{9635}\u{96e8}", "\u{96f7}\u{9635}\u{96e8}",
	 "\u{96f7}\u{9635}\u{96e8}\u{4f34}\u{6709}\u{51b0}\u{96f9}", "\u{96e8}\u{5939}\u{96ea}", 
	 "\u{5c0f}\u{96e8}", "\u{4e2d}\u{96e8}", "\u{5927}\u{96e8}", "\u{66b4}\u{96e8}", "\u{5927}\u{66b4}\u{96e8}", 
	 "\u{7279}\u{5927}\u{66b4}\u{96e8}", "\u{9635}\u{96ea}", "\u{5c0f}\u{96ea}", "\u{4e2d}\u{96ea}", "\u{5927}\u{96ea}", 
	 "\u{66b4}\u{96ea}", "\u{96fe}", "\u{51bb}\u{96e8}", "\u{6c99}\u{5c18}\u{66b4}", "\u{5c0f}\u{96e8}\u{2d}\u{4e2d}\u{96e8}", 
	 "\u{4e2d}\u{96e8}\u{2d}\u{5927}\u{96e8}", "\u{5927}\u{96e8}\u{2d}\u{66b4}\u{96e8}", "\u{66b4}\u{96e8}\u{2d}\u{5927}\u{66b4}\u{96e8}", 
	 "\u{5927}\u{66b4}\u{96e8}\u{2d}\u{7279}\u{5927}\u{66b4}\u{96e8}", "\u{5c0f}\u{96ea}\u{2d}\u{4e2d}\u{96ea}", 
	 "\u{4e2d}\u{96ea}\u{2d}\u{5927}\u{96ea}", "\u{5927}\u{96ea}\u{2d}\u{66b4}\u{96ea}",
	 "\u{6d6e}\u{6c89}", "\u{626c}\u{6c99}", "\u{5f3a}\u{6c99}\u{5c18}\u{66b4}", "\u{973e}"
 ];
 
// 小图标
var weatherType2IconSm = (type) => {
	let classType = '';
	switch(type) {
		case wtType[0]: classType = "icon-Sun";						break;
		case wtType[1]: classType = "icon-Clouds2";					break;
		case wtType[2]: classType = "icon-Cloud";					break;
		case wtType[3]: classType = "icon-Cloud-Rain";				break;
		case wtType[4]: classType = "icon-Cloud-Lightning";			break;
		case wtType[5]: classType = "icon-Cloud-Lightning";			break;
		case wtType[6]: classType = "icon-Cloud-Rain";				break;
		case wtType[7]: classType = "icon-Cloud-Rain";				break;
		case wtType[8]: classType = "icon-Cloud-Rain";				break;
		case wtType[9]: classType = "icon-Cloud-Rain";				break;
		case wtType[10]: classType = "icon-Cloud-Rain";				break;
		case wtType[11]: classType = "icon-Cloud-Rain";				break;
		case wtType[12]: classType = "icon-Cloud-Rain";				break;
		case wtType[13]: classType = "icon-Cloud-Snowflake";		break;
		case wtType[14]: classType = "icon-Cloud-Snowflake";		break;
		case wtType[15]: classType = "icon-Cloud-Snowflake";		break;
		case wtType[16]: classType = "icon-Cloud-Snowflake";		break;
		case wtType[17]: classType = "icon-Cloud-Snowflake";		break;
		case wtType[18]: classType = "icon-Cloud-Fog";				break;
		case wtType[19]: classType = "icon-Cloud-Rain";				break;
		case wtType[20]: classType = "icon-Cloud-Snow";				break;
		case wtType[21]: classType = "icon-Cloud-Rain";				break;
		case wtType[22]: classType = "icon-Cloud-Rain";				break;
		case wtType[23]: classType = "icon-Cloud-Rain";				break;
		case wtType[24]: classType = "icon-Cloud-Rain";				break;
		case wtType[25]: classType = "icon-Cloud-Rain";				break;
		case wtType[26]: classType = "icon-Cloud-Snowflake";		break;
		case wtType[27]: classType = "icon-Cloud-Snowflake";		break;
		case wtType[28]: classType = "icon-Cloud-Snowflake";		break;
		case wtType[29]: classType = "icon-Cloud-Snow";				break;
		case wtType[30]: classType = "icon-Cloud-Snow";				break;
		case wtType[31]: classType = "icon-Cloud-Snow";				break;
		case wtType[32]: classType = "icon-Cloud-Fog-Sun";			break;
		default : classType = "icon-Cloud";							break;
	}

	return classType;

}

// 大图标

var weatherType2Icon = (type) => {

	let classType = '';
	switch(type) {
		case wtType[0]: classType = "sunny";		break;
		case wtType[1]: classType = "cloudy2sunny";	break;
		case wtType[2]: classType = "cloudy";		break;
		case wtType[3]: classType = "rainy";		break;
		case wtType[4]: classType = "stormy";		break;
		case wtType[5]: classType = "stormy";		break;
		case wtType[6]: classType = "rainy";		break;
		case wtType[7]: classType = "rainy";		break;
		case wtType[8]: classType = "rainy";		break;
		case wtType[9]: classType = "rainy";		break;
		case wtType[10]: classType = "rainy";		break;
		case wtType[11]: classType = "rainy";		break;
		case wtType[12]: classType = "rainy";		break;
		case wtType[13]: classType = "snowy";		break;
		case wtType[14]: classType = "snowy";		break;
		case wtType[15]: classType = "snowy";		break;
		case wtType[16]: classType = "snowy";		break;
		case wtType[17]: classType = "snowy";		break;
		case wtType[18]: classType = "cloudy";		break;
		case wtType[19]: classType = "rainy";		break;
		case wtType[20]: classType = "cloudy";		break;
		case wtType[21]: classType = "rainy";		break;
		case wtType[22]: classType = "rainy";		break;
		case wtType[23]: classType = "rainy";		break;
		case wtType[24]: classType = "rainy";		break;
		case wtType[25]: classType = "rainy";		break;
		case wtType[26]: classType = "snowy";		break;
		case wtType[27]: classType = "snowy";		break;
		case wtType[28]: classType = "snowy";		break;
		case wtType[29]: classType = "cloudy";		break;
		case wtType[30]: classType = "cloudy";		break;
		case wtType[31]: classType = "cloudy";		break;
		case wtType[32]: classType = "cloudy";		break;
		default : classType = "cloudy";				break;
	}

	return classType;

}


export {weatherType2Icon, weatherType2IconSm};