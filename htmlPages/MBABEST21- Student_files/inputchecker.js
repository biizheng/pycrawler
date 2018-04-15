
//******************************************************************************
// * 関数名		：空欄でないことのチェック
// * 関数 ID		：checkNotBlankA(String val)
// * 処理内容		：空欄でないことのチェックする
// * 書式		：blnRet =iCheck.checkNotBlank(val);
// * 引数		：val	  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkNotBlankA( val ) {

	//check empty
	if( val == "") {
		return false;
	} else {
		return true;
	}

}

//******************************************************************************
// * 関数名		：メールアドレスのチェック
// * 関数 ID		：checkMailAddressA(String val)
// * 処理内容		：メールアドレスのチェックする
// * 書式		：blnRet =iCheck.checkMailAddress(val);
// * 引数		：val	  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkMailAddressA( val ) {

	// input value is empty, return value is true
	if( val == "" ) {
		return true;
	}
	//check email address
	var atIndex = val.indexOf('@');
	var dotIndex = val.indexOf('.', atIndex);
	var flag = true;
	var theSub = val.substring(0, dotIndex + 1);
	if ((atIndex<1) || (atIndex!=val.lastIndexOf('@'))
		|| (dotIndex<atIndex+2) || (val.length<=theSub.length)) {
		flag = false;
	} else {
		flag = true;
	}
	return(flag);
}

//******************************************************************************
// * 関数名		：数値が一定範囲内にあるかをチェック
// * 関数 ID		：checkAnkLengthA (String val, Array checkList, int min, int max)
// * 処理内容		：数値が一定範囲内にあるかをチェックする
// * 書式		：blnRet =iCheck.checkAnkLength(val, checkList, min, max);
// * 引数		：val	  ： チェックの値
// *                                  checklist  ： min or max
// *                                  min         ： 最小値(省略可)
// *                                  max        ： 最大値(省略可)
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkNumberValueA( val, checkList, min, max ) {

	// input value is empty, return value is true
	if( val == "" ) {
		return true;
	}

	// check val type
	if( isNaN(val) ) {
		return false;
	}

	// include min and max in the check list
	if( checkList.length == 2) {
		if(  isNaN(min) || isNaN(max)) {
			return false;
		}

		if( parseFloat(val)  < parseFloat(min) || parseFloat(val) > parseFloat(max) ) {
			return false;
		}
	} else {
		// only include min in the checklist
		if( checkList[0] == "min") {
			if(  isNaN(min)) {
				return false;
			}
			if(parseFloat(val) < parseFloat(min) ) {
				return false;
			}
		}
		// only include max in the checklist
		else if(checkList[0] == "max") {
			if(  isNaN(max)) {
				return false;
			}
			if( parseFloat(val) > parseFloat(max)) {
				return false;
			}
		}
	}

	return true;

}

//******************************************************************************
// * 関数名		：日付が一定範囲内にあるかをチェック
// * 関数 ID		：checkDateValueA (String val, Array checkList, int begin, int end)
// * 処理内容		：日付が一定範囲内にあるかをチェックする
// * 書式		：blnRet =iCheck.checkDateValue(val, checkList, begin, end);
// * 引数		：val	  ： チェックの値
// *                                  checklist  ： begin or end
// *                                  begin       ： 最小値(省略可)
// *                                  end         ： 最大値(省略可)
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkDateValueA( year, month, day, checkList,  begin, end ) {

    if ( func_IsDateChkYmd ( year, month, day ) == false ) {
        return false;
    }

    var val = year + "/" + month + "/" + day

	// include min and max in the check list
	if( checkList.length == 2) {
		if( isNaN( Date.parse(begin) ) || isNaN( Date.parse(end) ) ) {
			return false ;
		}
		if( Date.parse(val)  < Date.parse(begin) || Date.parse(val) > Date.parse(end) ) {
			return false;
		}
	} else {
		// only include begin in the checklist
		if( checkList[0] == "begin") {
			if( isNaN( Date.parse(begin) )  ) {
				return false ;
			}
			if(Date.parse(val) < Date.parse(begin) ) {
				return false;
			}
		}
		// only include max in the checklist
		else if(checkList[0] == "end") {
			if( isNaN( Date.parse(end) ) ) {
				return false ;
			}
			if( Date.parse(val) > Date.parse(end)) {
				return false;
			}
		}
	}

	return true;
}
	
//******************************************************************************
// * 関数名		：正規表現によるチェック。
// * 関数 ID		：checkRegexpA (String val, String expression)
// * 処理内容		：正規表現によるチェック する
// * 書式		：blnRet =iCheck.checkRegexp(val,expression);
// * 引数		：val	    ： チェックの値
// *                                  expression  ： 正規表現型
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkRegexpA( val, expression ) {

	//change form of expression
	if(expression.indexOf("/") >= 0 && expression.lastIndexOf("/")+1 == expression.length) {
		expression = expression.substring(1,expression.length-1) ;
	}
	//正規表現オブジェクト作成
	var reg_obj = new RegExp(expression);

	//check val accords with expression
	return reg_obj.test(val);
}

//******************************************************************************
// * 関数名		：ユーザ作成の関数によるチェック
// * 関数 ID		：checkCustomClassA(String val, String funcName)
// * 処理内容		：ユーザ作成の関数によるチェック する
// * 書式		：ret =iCheck.checkCustomClass(val,funcName);
// * 引数		：val	    ： チェックの値
// *                                  funcName  ： ユーザが定義された関数の名前
// * 戻り値		：ret 関数の値
// *
// *
//******************************************************************************

function checkCustomClassA( val, funcName ) {

	// construct user function
	impl = funcName + "(\"" + val + "\");"
	// return evaluate result
	return eval(impl);
}


//******************************************************************************
// * 関数名		：名前のformと名前のelementを存在する
// * 関数 ID		：existElement (String formname, String element)
// * 処理内容		：名前のformと名前のelementを存在する
// * 書式		：blnRet =iCheck.existElementA (formname,element)
// * 引数		：formname  ： 名前のform
// *			  element    ： 名前のelement
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function existElementA( formname, element ) {

	// test form exist
	if(typeof document.forms != "object") {
		return false;
	}
	// list all forms
	for( var i = 0 ; i < document.forms.length ; i++ ) {

		// check form name
		if(document.forms[i].name == formname ) {
			// list all elemets
			for( var j = 0; j < document.forms[i].elements.length ; j++) {
				// test name of element
				if(document.forms[i].elements[j].name == element) {

					return true ;
				}
			}
		} // end if

	}//end for

	return false ;
}

//******************************************************************************
// * 関数名		：全角文字のチェック
// * 関数 ID		：checkFwAll_All (String val)
// * 処理内容		：permit モード、全角文字のチェックする
// * 書式		：blnRet =checkFwAll_All (val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwAll_All( val ) {

	 // set return  value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//全角文字 マッチする正規表現オブジェクト作成
		var reg_str = "[\u3000, ";                                        // CharTypeFwSpace
		reg_str += "\uff21-\uff3a, \uff41-\uffff5a, " ;             // CharTypeFwAlpha
		reg_str += "\uff10-\uff19, "  ;                                 // CharTypeFwNumber
		reg_str += "\u2e80-\u2eff, \u2f00-\u2fdf, " ;             // CharTypeKanji
		reg_str += "\u3100-\u312f,\u31a0-\u31bf,";
		reg_str += "\u3400-\u4dbf,\u4e00-\u9faf, ";
		reg_str += "\uf900-\ufaff ,";
		reg_str += "\u3040-\u309f, " ;                                 // CharHiragana
		reg_str += "\u30a0-\u30ff " ;                                  // CharTypeFwKatakana
		reg_str += "]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：全角文字のチェック
// * 関数 ID		：checkFwAll_None (String val)
// * 処理内容		：prohibit モード、全角文字のチェックする
// * 書式		：blnRet =checkFwAll_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwAll_None( val ) {

	// set return  value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//非全角文字 マッチする正規表現オブジェクト作成
		var reg_str = "[^\u3000, ";                                        // CharTypeFwSpace
		reg_str += "\uff21-\uff3a, \uff41-\uffff5a, " ;             // CharTypeFwAlpha
		reg_str += "\uff10-\uff19, "  ;                                 // CharTypeFwNumber
		reg_str += "\u2e80-\u2eff, \u2f00-\u2fdf, " ;             // CharTypeKanji
		reg_str += "\u3100-\u312f,\u31a0-\u31bf,";
		reg_str += "\u3400-\u4dbf,\u4e00-\u9faf, ";
		reg_str += "\uf900-\ufaff ,";
		reg_str += "\u3040-\u309f, " ;                                 // CharHiragana
		reg_str += "\u30a0-\u30ff " ;                                  // CharTypeFwKatakana
		reg_str += "]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角文字のチェック
// * 関数 ID		：checkHwAll_All (String val)
// * 処理内容		：permit モード、半角文字のチェックする
// * 書式		：blnRet =checkHwAll_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwAll_All( val ) {

	// set return  value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//半角文字 マッチする正規表現オブジェクト作成
		var reg_str = "[\u0020-\u009f, \uff61-\uff9f]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角文字のチェック
// * 関数 ID		：checkHwAll_None (String val)
// * 処理内容		：prohibit モード、半角文字のチェックする
// * 書式		：blnRet =checkHwAll_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwAll_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//非半角文字 マッチする正規表現オブジェクト作成
		var reg_str = "[^\u0020-\u009f, \uff61-\uff9f]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角スペースのチェック
// * 関数 ID		：checkHwSpace_All(String val)
// * 処理内容		：permit モード、 半角スペースのチェック
// * 書式		：blnRet =checkHwSpace_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwSpace_All( val ) {

	 // set return  value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//半角スペース マッチする正規表現オブジェクト作成
		var reg_str = "[\u0020]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角スペースのチェック
// * 関数 ID		：checkHwSpace_None(String val)
// * 処理内容		：prohibit モード、 半角スペースのチェック
// * 書式		：blnRet =checkHwSpace_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwSpace_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//非半角スペース マッチする正規表現オブジェクト作成
		var reg_str = "[^\u0020]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：全角スペースのチェック
// * 関数 ID		：checkFwSpace_All(String val)
// * 処理内容		：permit モード、 全角スペースのチェック
// * 書式		：blnRet =checkFwSpace_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwSpace_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//全角スペース マッチする正規表現オブジェクト作成
		var reg_str = "[\u3000]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：全角スペースのチェック
// * 関数 ID		：checkFwSpace_None(String val)
// * 処理内容		：prohibit モード、 全角スペースのチェック
// * 書式		：blnRet =checkFwSpace_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwSpace_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//非全角スペース マッチする正規表現オブジェクト作成
		var reg_str = "[^\u3000]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角アルファベットのチェック
// * 関数 ID		：checkHwAlpha_All(String val)
// * 処理内容		：permit モード、 半角アルファベットのチェック
// * 書式		：blnRet =checkHwAlpha_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwAlpha_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//半角アルファベット マッチする正規表現オブジェクト作成
		var reg_str = "[\u0041-\u005A,\u0061-\u007A]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;

}

//******************************************************************************
// * 関数名		：半角アルファベットのチェック
// * 関数 ID		：checkHwAlpha_None(String val)
// * 処理内容		：prohibit モード、 半角アルファベットのチェック
// * 書式		：blnRet =checkHwAlpha_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwAlpha_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//非半角アルファベット マッチする正規表現オブジェクト作成
		var reg_str = "[^\u0041-\u005A,\u0061-\u007A]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角アルファベット大文字のチェック
// * 関数 ID		：checkHwAlphaU_All(String val)
// * 処理内容		：permit モード、 半角アルファベット大文字のチェック
// * 書式		：blnRet =checkHwAlphaU_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwAlphaU_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//半角アルファベット大文字 マッチする正規表現オブジェクト作成
		var reg_str = "[\u0041-\u005A]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角アルファベット大文字のチェック
// * 関数 ID		：checkHwAlphaU_None(String val)
// * 処理内容		：prohibit モード、 半角アルファベット大文字のチェック
// * 書式		：blnRet =checkHwAlphaU_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwAlphaU_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//非半角アルファベット大文字 マッチする正規表現オブジェクト作成
		var reg_str = "[^(\u0041-\u005A)]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角アルファベット小文字のチェック
// * 関数 ID		：checkHwAlphaL_All(String val)
// * 処理内容		：permit モード、 半角アルファベット小文字のチェック
// * 書式		：blnRet =checkHwAlphaL_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwAlphaL_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//半角アルファベット小文字 マッチする正規表現オブジェクト作成
		var reg_str = "[\u0061-\u007A]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角アルファベット小文字のチェック
// * 関数 ID		：checkHwAlphaL_None(String val)
// * 処理内容		：prohibit モード、 半角アルファベット小文字のチェック
// * 書式		：blnRet =checkHwAlphaL_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwAlphaL_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//非半角アルファベット小文字 マッチする正規表現オブジェクト作成
		var reg_str = "[^(\u0061-\u007A)]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：全角アルファベットのチェック
// * 関数 ID		：checkFwAlpha_All(String val)
// * 処理内容		：permit モード、 全角アルファベットのチェック
// * 書式		：blnRet =checkFwAlpha_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwAlpha_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//全角アルファベット マッチする正規表現オブジェクト作成
		var reg_str = "[\uff21-\uff3A,\uff41-\uff5A]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：全角アルファベットのチェック
// * 関数 ID		：checkFwAlpha_None(String val)
// * 処理内容		：prohibit モード、 全角アルファベットのチェック
// * 書式		：blnRet =checkFwAlpha_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwAlpha_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//非全角アルファベット マッチする正規表現オブジェクト作成
		var reg_str = "[^\uff21-\uff3A,\uff41-\uff5A]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角数字のチェック
// * 関数 ID		：checkHwNumber_All(String val)
// * 処理内容		：permitモード、 半角数字のチェック
// * 書式		：blnRet =checkHwNumber_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwNumber_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//半角数字 マッチする正規表現オブジェクト作成
		var reg_str = "[\u0030-\u0039]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：半角数字のチェック
// * 関数 ID		：checkHwNumber_None(String val)
// * 処理内容		：prohibitモード、 半角数字のチェック
// * 書式		：blnRet =checkHwNumber_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwNumber_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// 非半角数字 マッチする正規表現オブジェクト作成
		var reg_str = "[^\u0030-\u0039]";                       // 非半角数字アルファベット

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：全角数字のチェック
// * 関数 ID		：checkFwNumber_All(String val)
// * 処理内容		：permitモード、 全角数字のチェック
// * 書式		：blnRet =checkHwNumber_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwNumber_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// 全角数字 マッチする正規表現オブジェクト作成
		var reg_str = "[\uff10-\uff19]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}


	return res;
}

//******************************************************************************
// * 関数名		：全角数字のチェック
// * 関数 ID		：checkFwNumber_None(String val)
// * 処理内容		：prohibitモード、 全角数字のチェック
// * 書式		：blnRet =checkHwNumber_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwNumber_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// 非全角数字 マッチする正規表現オブジェクト作成
		var reg_str = "[^\uff10-\uff19]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：漢字のチェック
// * 関数 ID		：checkKanji_All(String val)
// * 処理内容		：permitモード、 漢字のチェック
// * 書式		：blnRet =checkKanji_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkKanji_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//漢字マッチする正規表現オブジェクト作成
		var reg_str = "[\u2e80-\u2eff, \u2f00-\u2fdf, \u3100-\u312f,";
		reg_str += "\u31a0-\u31bf, \u3400-\u4dbf,\u4e00-\u9faf, \uf900-\ufaff]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		：漢字のチェック
// * 関数 ID		：checkKanji_None(String val)
// * 処理内容		：prohibitモード、 漢字のチェック
// * 書式		：blnRet =checkKanji_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkKanji_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//非漢字マッチする正規表現オブジェクト作成
		var reg_str = "[^\u2e80-\u2eff, \u2f00-\u2fdf, \u3100-\u312f,";
		reg_str += "\u31a0-\u31bf, \u3400-\u4dbf,\u4e00-\u9faf, \uf900-\ufaff]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		： ひらがなのチェック
// * 関数 ID		：checkHiragana_All(String val)
// * 処理内容		：permitモード、  ひらがなのチェック
// * 書式		：blnRet =checkHiragana_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHiragana_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// ひらがな マッチする正規表現オブジェクト作成
		var reg_str = "[\u3040-\u309f]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		： ひらがなのチェック
// * 関数 ID		：checkHiragana_None(String val)
// * 処理内容		：prohibitモード、  ひらがなのチェック
// * 書式		：blnRet =checkHiragana_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHiragana_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// 非ひらがな マッチする正規表現オブジェクト作成
		var reg_str = "[^\u3040-\u309f]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		： 全角カタカナのチェック
// * 関数 ID		：checkFwKatakana_All(String val)
// * 処理内容		：permitモード、  全角カタカナのチェック
// * 書式		：blnRet =checkFwKatakana_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwKatakana_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// 全角カタカナ マッチする正規表現オブジェクト作成
		var reg_str = "[\u30a0-\u30ff]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		： 全角カタカナのチェック
// * 関数 ID		：checkFwKatakana_None(String val)
// * 処理内容		：prohibitモード、  全角カタカナのチェック
// * 書式		：blnRet =checkFwKatakana_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkFwKatakana_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// 非全角カタカナ マッチする正規表現オブジェクト作成
		var reg_str = "[^\u30a0-\u30ff]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		： 半角カタカナのチェック
// * 関数 ID		：checkHwKatakana_All(String val)
// * 処理内容		：permitモード、  半角カタカナのチェック
// * 書式		：blnRet =checkHwKatakana_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwKatakana_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// 半角カタカナ マッチする正規表現オブジェクト作成
		var reg_str = "[\uFF61-\uFF9F]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;

}

//******************************************************************************
// * 関数名		： 半角カタカナのチェック
// * 関数 ID		：checkHwKatakana_None(String val)
// * 処理内容		：permitモード、  半角カタカナのチェック
// * 書式		：blnRet =checkHwKatakana_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwKatakana_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		 // 非半角カタカナ マッチする正規表現オブジェクト作成
		var reg_str = "[^\uff61-\uff9f]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		： 半角コードのチェック
// * 関数 ID		：checkHwCode_All(String val)
// * 処理内容		：permitモード、  半角コードのチェック
// * 書式		：blnRet =checkHwCode_All(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwCode_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// 半角コード マッチする正規表現オブジェクト作成
		var reg_str = "[\u0021-\u007e]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;

}

//******************************************************************************
// * 関数名		： 半角コードのチェック
// * 関数 ID		：checkHwCode_None(String val)
// * 処理内容		：permitモード、  半角コードのチェック
// * 書式		：blnRet =checkHwCode_None(val)
// * 引数		：val  ： チェックの値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkHwCode_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		 // 非半角コード マッチする正規表現オブジェクト作成
		var reg_str = "[^\u0021-\u007e]";

		// Create regular expression object
		var reg_obj = new RegExp(reg_str);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false ) {
				break ;
			}
		}
	}

	return res;
}

//******************************************************************************
// * 関数名		： test function write by ユーザー
//******************************************************************************

function checkNotBlankByUser( val ) {

	if(val != "") {
		return true ;
	 } else {
	 	return false;
	}
}

//====================================================================
//機能：		日付が妥当な数値かチェックする
//引数：
//		year	(I)
//		month	(I)
//		day	(I)
//戻り値：	0	エラー  ゼロ以外 ４桁の西暦年
//====================================================================
function func_IsDateChkYmd(year, month, day){

	// input value is empty, return value is true
	if ( ( year == "" ) && ( month == "" ) && ( day == "" ) ) {
		return true;
	} else if (( year == "" ) || ( month == "" ) || ( day == "" )) {
		return false;
	}
	

	//judge format of value
	if ( isNaN( year ) || isNaN( month ) || isNaN( day )  || year.indexOf("e")>=0) {
		return false;
	}

	if( year < 1000 )
		return false;
	else if( year >= 0 && year < 70 )
		year = 2000 + year;
	else if( year >= 70 && year < 100 )
		year = 1900 + year;

	if( month < 1 || month > 12 )
		return false;
	if( day < 1 || day > func_IsDateGetMonNum(year, month) )
		return false;

	return true;
}

//====================================================================
//機能：		月の日数を取得する
//引数：
//		year	(I)
//		month	(I)
//戻り値：	0	エラー  ゼロ以外 指定月の日数
//====================================================================
function func_IsDateGetMonNum(year, month){
	if( month == 1 || month == 3 || month == 5 || month == 7
	 || month == 8 || month == 10 || month == 12 )
		return 31;
	else if( month == 2 ){
		if((year%4 == 0 && year%100 != 0) || year%400 == 0)
			return 29;
		else
			return 28;
	}
	else if( month == 4 || month == 6 || month == 9 || month == 11 )
		return 30;
	else
		return 0;
}

//====================================================================
//機能：		get the selected radio button index
//引数：
//		radioObj	(I)
//戻り値：	0	エラー  ゼロ以外 指定月の日数
//====================================================================
function getSelectedRadioIndex(radioObj){

	var radioIndex = -1;
	if(typeof radioObj == "object") {
		if (radioObj.checked == true) {
			radioIndex = 0;
		} else { 
			for (i=0; i<radioObj.length; i++) {
				if (radioObj.item(i).checked == true) {
					radioIndex = i;
				}
			}
		}
	}

	return radioIndex;
}

//------------------------------------------------------------------------
function trim(obj)
    {
    var strTrim="";
    var strTemp="";
    var strTemp1="";
    var str=""

    str=obj.value;

    for(i=0;i<str.length;i++)
    {
        strTemp=str.substring(i,i+1);

        if (strTemp == "　" || strTemp == " ")
        {
            strTrim = str.substring(i+1,str.length);
        }
        else
        {
            strTrim = str.substring(i,str.length);
            break;
        }
    }

    strTemp1 = strTrim;

    for(i=0;i<strTemp1.length;i++)
    {
        strTemp=strTemp1.substring(strTemp1.length-1-i,strTemp1.length-i);

        if (strTemp == "　" || strTemp == " " )
        {
            strTrim = strTemp1.substring(0,strTemp1.length-1-i);
        }
        else
        {
            strTrim = strTemp1.substring(0,strTemp1.length-i);
            break;
        }
    }
	
	obj.value = strTrim;
    return(strTrim);

}

// compare tow numbers
function IsMoreThan(first, second) {
	
	var bigvalue = Math.max(first,second);
	
	if (first==second) {
		return 0;
	} else if (bigvalue==first) {
		return 1;
	} else {
		return -1;
	}
}

//====================================================================
//機能：		get the selected checkbox number
//引数：
//		checkObj	(I)
//戻り値：	n	selected checkbox number
//====================================================================
function getCheckBoxNum(formname, checkObj, checkLen){

	var checkNum = -1;
	var formIndex = -1;
	
	// list all forms
	for( var i = 0 ; i < document.forms.length ; i++ ) {
		// check form name
		if(document.forms[i].name == formname ) {
			formIndex = i;
			break;
		}
	}
	// form is not exist or checkbox is not exit
	if ((formIndex==-1) || (checkLen==0)) {
		return checkNum;
	}
	// get the selected checkbox number
	for (var j=0; j<checkLen; j++) {
		if (document.forms[formIndex].item(checkObj + "[" + j + "]").checked == true ) {
			checkNum++;
		}
	}
	checkNum++;

	return checkNum;
}
//====================================================================
//機能：		Trim all spaces of value
//引数：        val
//		val	(I)
//戻り値：	Trimed value
//====================================================================
function trimx(val)
    {
    var strTrim="";
    var strTemp="";
    var strTemp1="";
    var str=""

    str=val;

    for(i=0;i<str.length;i++)
    {
        strTemp=str.substring(i,i+1);

        if (strTemp == "　" || strTemp == " ")
        {
            strTrim = str.substring(i+1,str.length);
        }
        else
        {
            strTrim = str.substring(i,str.length);
            break;
        }
    }

    strTemp1 = strTrim;

    for(i=0;i<strTemp1.length;i++)
    {
        strTemp=strTemp1.substring(strTemp1.length-1-i,strTemp1.length-i);

        if (strTemp == "　" || strTemp == " " )
        {
            strTrim = strTemp1.substring(0,strTemp1.length-1-i);
        }
        else
        {
            strTrim = strTemp1.substring(0,strTemp1.length-i);
            break;
        }
    }
	
    return(strTrim);

}

//====================================================================
//機能：		Trim all right spaces of value
//引数：        val
//		val	(I)
//戻り値：	Right trimed value
//====================================================================
function rtrim(val)
    {
    var strTrim="";
    var strTemp="";
    var strTemp1="";

    strTrim=val;

    strTemp1 = strTrim;

    for(i=0;i<strTemp1.length;i++)
    {
        strTemp=strTemp1.substring(strTemp1.length-1-i,strTemp1.length-i);

        if (strTemp == "　" || strTemp == " " )
        {
            strTrim = strTemp1.substring(0,strTemp1.length-1-i);
        }
        else
        {
            strTrim = strTemp1.substring(0,strTemp1.length-i);
            break;
        }
    }
	
    return(strTrim);
}
//====================================================================
//機能：		日付が妥当な数値かチェックする
//引数：
//		val	(I)  ""
//戻り値：	true	エラー  false
//====================================================================
function checkDateValue(val){
  if (val == null || val == "" || val.length != 10){
    return false;
  }
  year  = val.substring(0,4);
  line1 = val.substring(4,5);
  month = val.substring(5,7);
  line2 = val.substring(7,8);
  day   = val.substring(8,10);
  if(line1 != "/" || line2 != "/"){
    return false;
  }
  return func_IsDateChkYmd(year,month,day);
}
//====================================================================
//機能：		半角英数のチェックする
//引数：
//		val	(I)  ""
//戻り値：	true	エラー  false
//====================================================================
function checkENValue(val){
	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//半角数字 半角アルファベット マッチする正規表現オブジェクト作成
		var reg_str = "[\u0030-\u0039,\u0041-\u005A,\u0061-\u007A]";
		//","
		var reg_str2 = "[\u002C]";
		// Create regular expression object
		var reg_obj = new RegExp(reg_str);
                var reg_obj2 = new RegExp(reg_str2);

		// check input value
		for(var i = 0; i < val.length; i++ ) {

			//check every input character with regular expression
			res = reg_obj.test( val.charAt(i) );
                        res2 = reg_obj2.test( val.charAt(i) );

			// if include unregular character then skip over this circle
			if( res == false || res2 == true) {
			        res = false;
				break ;
			}
		}
	}
	return res;
}
//******************************************************************************
// * 関数名		  ：数値がチェック
// * 関数 ID     : checkNumberValue (String val, int length)
// * 処理内容		：数値がチェックする
// * 書式		    ：blnRet =checkNumberValue(val, length);
// * 引数		    ：val	  ： チェックの値
// * 戻り値		  ：blnRet
// *       true	：正常
// *			 false：異常
// *
//******************************************************************************

function checkNumberValue( val ,length) {
	// input value is empty, return value is true
	if( val == "" ) {
		return true;
	}
	// check val type
	if( isNaN(val) ) {
		return false;
	}
	if(val.substring(val.length-1,val.length) == "."){
	  return false;
	}
	if(val.substring(0,1) == "."){
	  return false;
	}
	if(val.substring(0,1) == "-" && val.substring(1,2) == "."){
	  return false;
	}
  pos = val.indexOf(".");
  if (pos != -1 && pos < val.length - length-1){
    return false;
  }
	return true;
}

//******************************************************************************
// * 関数名		  ：数値がチェック
// * 関数 ID     : checkNumberValue2 (String val)
// * 処理内容		：数値がチェックする
// * 書式		    ：blnRet =checkNumberValue2(val);
// * 引数		    ：val	  ： チェックの値
// * 戻り値		  ：blnRet
// *       true	：正常
// *			 false：異常
// *
//******************************************************************************

function checkNumberValue2( val ) {
	return checkNumberValue(val,2);
}
//******************************************************************************
// * 関数名		  ：数値がチェック
// * 関数 ID     : checkNumberValue3 (String val)
// * 処理内容		：数値がチェックする
// * 書式		    ：blnRet =checkNumberValue2(val);
// * 引数		    ：val	  ： チェックの値
// * 戻り値		  ：blnRet
// *       true	：正常
// *			 false：異常
// *
//******************************************************************************

function checkNumberValue3( val ,length1,length2) {
	if( val == "" ) {
		return true;
	}

	// check val type
	if( isNaN(val) ) {
		return false;
	}
	max = 1;
	for (i = 0 ; i < length1 ; i++ ){
		max = max * 10;
	}
	
	if (Math.abs(val) >= max){
		return false;
	}
	
	return checkNumberValue(val,length2);
}
//******************************************************************************
// * 関数名		  ：数値をチェック
// * 関数 ID     : checkNumberValue4 (String val, int length)
// * 処理内容		：数値をチェックする
// * 書式		    ：blnRet =checkNumberValue4(val, length);
// * 引数		    ：val	  ： チェックの値
// * 戻り値		  ：blnRet
// *       true	：正常
// *			 false：異常
// *
//******************************************************************************

function checkNumberValue4( val ,length) {
	// input value is empty, return value is true
	if( val == "" ) {
		return true;
	}
	// check val type
	if( isNaN(val) ) {
		return false;
	}
	if(val.substring(val.length-1,val.length) == "."){
	  return false;
	}
	if(val.substring(0,1) == "."){
	  return false;
	}
	if(val.substring(1,2) == "."){
	  return false;
	}
  pos = val.indexOf(".");
  if (pos != -1 && pos < val.length - length-1){
    return false;
  }
	return true;
}
//******************************************************************************
// * 関数名		：ＡＮＫで文字の長さによる入力チェック
// * 関数 ID		：checkAnkLengthA (String val, int max)
// * 処理内容		：ＡＮＫで文字の長さによる入力チェック（全角文字を２文字と数える）
// * 書式		：blnRet =checkAnkLength(val, max);
// * 引数		：val	  ： チェックの値
// *                                  max        ： 最大値
// * 戻り値		：blnRet
// *                                  true	：正常
// *			 false	：異常
// *
//******************************************************************************

function checkAnkLengthA( val, max ) {

	// input value is empty, return value is true
	if( val == "" ) {
		return true;
	}

	// check length of input value
	var cnt = 0;
	for(var i = 0; i < val.length ; i++) {
		var s1 = val.charAt(i) ;
    if (s1 >= "｡" && s1 <="ﾟ") {
     	cnt +=1;	      //半角カナ
    }else if (escape(s1).length >= 4) {
      cnt +=2;	      //全角
    }else { 
    	cnt +=1 ; 
    }
	}

  if(cnt > max) {
		return false;
	}

	return true;
}

function trimNum(obj){
  trim(obj);
  var val = obj.value;
  if (val != "" && val != null){ 
    vl = val.length;
  }else{
    obj.value = val;
    return val;
  }
  for (i = 0;i < vl;i++){
    if (val.length < 2){
      obj.value = val;
      return val;
    }
    if (val.substring(0,1) == 0 && val.substring(1,2) != "."){
      val = val.substring(1,val.length);
    }else{
      obj.value = val;
      return val;
    }
  }
  obj.value = val;
  return val;
}