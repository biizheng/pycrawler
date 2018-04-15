
//******************************************************************************
// * �֐���		�F�󗓂łȂ����Ƃ̃`�F�b�N
// * �֐� ID		�FcheckNotBlankA(String val)
// * �������e		�F�󗓂łȂ����Ƃ̃`�F�b�N����
// * ����		�FblnRet =iCheck.checkNotBlank(val);
// * ����		�Fval	  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
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
// * �֐���		�F���[���A�h���X�̃`�F�b�N
// * �֐� ID		�FcheckMailAddressA(String val)
// * �������e		�F���[���A�h���X�̃`�F�b�N����
// * ����		�FblnRet =iCheck.checkMailAddress(val);
// * ����		�Fval	  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
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
// * �֐���		�F���l�����͈͓��ɂ��邩���`�F�b�N
// * �֐� ID		�FcheckAnkLengthA (String val, Array checkList, int min, int max)
// * �������e		�F���l�����͈͓��ɂ��邩���`�F�b�N����
// * ����		�FblnRet =iCheck.checkAnkLength(val, checkList, min, max);
// * ����		�Fval	  �F �`�F�b�N�̒l
// *                                  checklist  �F min or max
// *                                  min         �F �ŏ��l(�ȗ���)
// *                                  max        �F �ő�l(�ȗ���)
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
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
// * �֐���		�F���t�����͈͓��ɂ��邩���`�F�b�N
// * �֐� ID		�FcheckDateValueA (String val, Array checkList, int begin, int end)
// * �������e		�F���t�����͈͓��ɂ��邩���`�F�b�N����
// * ����		�FblnRet =iCheck.checkDateValue(val, checkList, begin, end);
// * ����		�Fval	  �F �`�F�b�N�̒l
// *                                  checklist  �F begin or end
// *                                  begin       �F �ŏ��l(�ȗ���)
// *                                  end         �F �ő�l(�ȗ���)
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
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
// * �֐���		�F���K�\���ɂ��`�F�b�N�B
// * �֐� ID		�FcheckRegexpA (String val, String expression)
// * �������e		�F���K�\���ɂ��`�F�b�N ����
// * ����		�FblnRet =iCheck.checkRegexp(val,expression);
// * ����		�Fval	    �F �`�F�b�N�̒l
// *                                  expression  �F ���K�\���^
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkRegexpA( val, expression ) {

	//change form of expression
	if(expression.indexOf("/") >= 0 && expression.lastIndexOf("/")+1 == expression.length) {
		expression = expression.substring(1,expression.length-1) ;
	}
	//���K�\���I�u�W�F�N�g�쐬
	var reg_obj = new RegExp(expression);

	//check val accords with expression
	return reg_obj.test(val);
}

//******************************************************************************
// * �֐���		�F���[�U�쐬�̊֐��ɂ��`�F�b�N
// * �֐� ID		�FcheckCustomClassA(String val, String funcName)
// * �������e		�F���[�U�쐬�̊֐��ɂ��`�F�b�N ����
// * ����		�Fret =iCheck.checkCustomClass(val,funcName);
// * ����		�Fval	    �F �`�F�b�N�̒l
// *                                  funcName  �F ���[�U����`���ꂽ�֐��̖��O
// * �߂�l		�Fret �֐��̒l
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
// * �֐���		�F���O��form�Ɩ��O��element�𑶍݂���
// * �֐� ID		�FexistElement (String formname, String element)
// * �������e		�F���O��form�Ɩ��O��element�𑶍݂���
// * ����		�FblnRet =iCheck.existElementA (formname,element)
// * ����		�Fformname  �F ���O��form
// *			  element    �F ���O��element
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
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
// * �֐���		�F�S�p�����̃`�F�b�N
// * �֐� ID		�FcheckFwAll_All (String val)
// * �������e		�Fpermit ���[�h�A�S�p�����̃`�F�b�N����
// * ����		�FblnRet =checkFwAll_All (val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwAll_All( val ) {

	 // set return  value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�S�p���� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F�S�p�����̃`�F�b�N
// * �֐� ID		�FcheckFwAll_None (String val)
// * �������e		�Fprohibit ���[�h�A�S�p�����̃`�F�b�N����
// * ����		�FblnRet =checkFwAll_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwAll_None( val ) {

	// set return  value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//��S�p���� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�����̃`�F�b�N
// * �֐� ID		�FcheckHwAll_All (String val)
// * �������e		�Fpermit ���[�h�A���p�����̃`�F�b�N����
// * ����		�FblnRet =checkHwAll_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwAll_All( val ) {

	// set return  value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//���p���� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�����̃`�F�b�N
// * �֐� ID		�FcheckHwAll_None (String val)
// * �������e		�Fprohibit ���[�h�A���p�����̃`�F�b�N����
// * ����		�FblnRet =checkHwAll_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwAll_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�񔼊p���� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�X�y�[�X�̃`�F�b�N
// * �֐� ID		�FcheckHwSpace_All(String val)
// * �������e		�Fpermit ���[�h�A ���p�X�y�[�X�̃`�F�b�N
// * ����		�FblnRet =checkHwSpace_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwSpace_All( val ) {

	 // set return  value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//���p�X�y�[�X �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�X�y�[�X�̃`�F�b�N
// * �֐� ID		�FcheckHwSpace_None(String val)
// * �������e		�Fprohibit ���[�h�A ���p�X�y�[�X�̃`�F�b�N
// * ����		�FblnRet =checkHwSpace_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwSpace_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�񔼊p�X�y�[�X �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F�S�p�X�y�[�X�̃`�F�b�N
// * �֐� ID		�FcheckFwSpace_All(String val)
// * �������e		�Fpermit ���[�h�A �S�p�X�y�[�X�̃`�F�b�N
// * ����		�FblnRet =checkFwSpace_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwSpace_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�S�p�X�y�[�X �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F�S�p�X�y�[�X�̃`�F�b�N
// * �֐� ID		�FcheckFwSpace_None(String val)
// * �������e		�Fprohibit ���[�h�A �S�p�X�y�[�X�̃`�F�b�N
// * ����		�FblnRet =checkFwSpace_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwSpace_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//��S�p�X�y�[�X �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�A���t�@�x�b�g�̃`�F�b�N
// * �֐� ID		�FcheckHwAlpha_All(String val)
// * �������e		�Fpermit ���[�h�A ���p�A���t�@�x�b�g�̃`�F�b�N
// * ����		�FblnRet =checkHwAlpha_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwAlpha_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//���p�A���t�@�x�b�g �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�A���t�@�x�b�g�̃`�F�b�N
// * �֐� ID		�FcheckHwAlpha_None(String val)
// * �������e		�Fprohibit ���[�h�A ���p�A���t�@�x�b�g�̃`�F�b�N
// * ����		�FblnRet =checkHwAlpha_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwAlpha_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�񔼊p�A���t�@�x�b�g �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�A���t�@�x�b�g�啶���̃`�F�b�N
// * �֐� ID		�FcheckHwAlphaU_All(String val)
// * �������e		�Fpermit ���[�h�A ���p�A���t�@�x�b�g�啶���̃`�F�b�N
// * ����		�FblnRet =checkHwAlphaU_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwAlphaU_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//���p�A���t�@�x�b�g�啶�� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�A���t�@�x�b�g�啶���̃`�F�b�N
// * �֐� ID		�FcheckHwAlphaU_None(String val)
// * �������e		�Fprohibit ���[�h�A ���p�A���t�@�x�b�g�啶���̃`�F�b�N
// * ����		�FblnRet =checkHwAlphaU_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwAlphaU_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�񔼊p�A���t�@�x�b�g�啶�� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�A���t�@�x�b�g�������̃`�F�b�N
// * �֐� ID		�FcheckHwAlphaL_All(String val)
// * �������e		�Fpermit ���[�h�A ���p�A���t�@�x�b�g�������̃`�F�b�N
// * ����		�FblnRet =checkHwAlphaL_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwAlphaL_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//���p�A���t�@�x�b�g������ �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�A���t�@�x�b�g�������̃`�F�b�N
// * �֐� ID		�FcheckHwAlphaL_None(String val)
// * �������e		�Fprohibit ���[�h�A ���p�A���t�@�x�b�g�������̃`�F�b�N
// * ����		�FblnRet =checkHwAlphaL_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwAlphaL_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�񔼊p�A���t�@�x�b�g������ �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F�S�p�A���t�@�x�b�g�̃`�F�b�N
// * �֐� ID		�FcheckFwAlpha_All(String val)
// * �������e		�Fpermit ���[�h�A �S�p�A���t�@�x�b�g�̃`�F�b�N
// * ����		�FblnRet =checkFwAlpha_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwAlpha_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�S�p�A���t�@�x�b�g �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F�S�p�A���t�@�x�b�g�̃`�F�b�N
// * �֐� ID		�FcheckFwAlpha_None(String val)
// * �������e		�Fprohibit ���[�h�A �S�p�A���t�@�x�b�g�̃`�F�b�N
// * ����		�FblnRet =checkFwAlpha_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwAlpha_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//��S�p�A���t�@�x�b�g �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�����̃`�F�b�N
// * �֐� ID		�FcheckHwNumber_All(String val)
// * �������e		�Fpermit���[�h�A ���p�����̃`�F�b�N
// * ����		�FblnRet =checkHwNumber_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwNumber_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//���p���� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F���p�����̃`�F�b�N
// * �֐� ID		�FcheckHwNumber_None(String val)
// * �������e		�Fprohibit���[�h�A ���p�����̃`�F�b�N
// * ����		�FblnRet =checkHwNumber_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwNumber_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// �񔼊p���� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
		var reg_str = "[^\u0030-\u0039]";                       // �񔼊p�����A���t�@�x�b�g

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
// * �֐���		�F�S�p�����̃`�F�b�N
// * �֐� ID		�FcheckFwNumber_All(String val)
// * �������e		�Fpermit���[�h�A �S�p�����̃`�F�b�N
// * ����		�FblnRet =checkHwNumber_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwNumber_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// �S�p���� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F�S�p�����̃`�F�b�N
// * �֐� ID		�FcheckFwNumber_None(String val)
// * �������e		�Fprohibit���[�h�A �S�p�����̃`�F�b�N
// * ����		�FblnRet =checkHwNumber_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwNumber_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// ��S�p���� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F�����̃`�F�b�N
// * �֐� ID		�FcheckKanji_All(String val)
// * �������e		�Fpermit���[�h�A �����̃`�F�b�N
// * ����		�FblnRet =checkKanji_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkKanji_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�����}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F�����̃`�F�b�N
// * �֐� ID		�FcheckKanji_None(String val)
// * �������e		�Fprohibit���[�h�A �����̃`�F�b�N
// * ����		�FblnRet =checkKanji_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkKanji_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//�񊿎��}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F �Ђ炪�Ȃ̃`�F�b�N
// * �֐� ID		�FcheckHiragana_All(String val)
// * �������e		�Fpermit���[�h�A  �Ђ炪�Ȃ̃`�F�b�N
// * ����		�FblnRet =checkHiragana_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHiragana_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// �Ђ炪�� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F �Ђ炪�Ȃ̃`�F�b�N
// * �֐� ID		�FcheckHiragana_None(String val)
// * �������e		�Fprohibit���[�h�A  �Ђ炪�Ȃ̃`�F�b�N
// * ����		�FblnRet =checkHiragana_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHiragana_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// ��Ђ炪�� �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F �S�p�J�^�J�i�̃`�F�b�N
// * �֐� ID		�FcheckFwKatakana_All(String val)
// * �������e		�Fpermit���[�h�A  �S�p�J�^�J�i�̃`�F�b�N
// * ����		�FblnRet =checkFwKatakana_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwKatakana_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// �S�p�J�^�J�i �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F �S�p�J�^�J�i�̃`�F�b�N
// * �֐� ID		�FcheckFwKatakana_None(String val)
// * �������e		�Fprohibit���[�h�A  �S�p�J�^�J�i�̃`�F�b�N
// * ����		�FblnRet =checkFwKatakana_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkFwKatakana_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// ��S�p�J�^�J�i �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F ���p�J�^�J�i�̃`�F�b�N
// * �֐� ID		�FcheckHwKatakana_All(String val)
// * �������e		�Fpermit���[�h�A  ���p�J�^�J�i�̃`�F�b�N
// * ����		�FblnRet =checkHwKatakana_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwKatakana_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// ���p�J�^�J�i �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F ���p�J�^�J�i�̃`�F�b�N
// * �֐� ID		�FcheckHwKatakana_None(String val)
// * �������e		�Fpermit���[�h�A  ���p�J�^�J�i�̃`�F�b�N
// * ����		�FblnRet =checkHwKatakana_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwKatakana_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		 // �񔼊p�J�^�J�i �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F ���p�R�[�h�̃`�F�b�N
// * �֐� ID		�FcheckHwCode_All(String val)
// * �������e		�Fpermit���[�h�A  ���p�R�[�h�̃`�F�b�N
// * ����		�FblnRet =checkHwCode_All(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwCode_All( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		// ���p�R�[�h �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F ���p�R�[�h�̃`�F�b�N
// * �֐� ID		�FcheckHwCode_None(String val)
// * �������e		�Fpermit���[�h�A  ���p�R�[�h�̃`�F�b�N
// * ����		�FblnRet =checkHwCode_None(val)
// * ����		�Fval  �F �`�F�b�N�̒l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
// *
//******************************************************************************

function checkHwCode_None( val ) {

	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		 // �񔼊p�R�[�h �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		�F test function write by ���[�U�[
//******************************************************************************

function checkNotBlankByUser( val ) {

	if(val != "") {
		return true ;
	 } else {
	 	return false;
	}
}

//====================================================================
//�@�\�F		���t���Ó��Ȑ��l���`�F�b�N����
//�����F
//		year	(I)
//		month	(I)
//		day	(I)
//�߂�l�F	0	�G���[  �[���ȊO �S���̐���N
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
//�@�\�F		���̓������擾����
//�����F
//		year	(I)
//		month	(I)
//�߂�l�F	0	�G���[  �[���ȊO �w�茎�̓���
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
//�@�\�F		get the selected radio button index
//�����F
//		radioObj	(I)
//�߂�l�F	0	�G���[  �[���ȊO �w�茎�̓���
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

        if (strTemp == "�@" || strTemp == " ")
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

        if (strTemp == "�@" || strTemp == " " )
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
//�@�\�F		get the selected checkbox number
//�����F
//		checkObj	(I)
//�߂�l�F	n	selected checkbox number
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
//�@�\�F		Trim all spaces of value
//�����F        val
//		val	(I)
//�߂�l�F	Trimed value
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

        if (strTemp == "�@" || strTemp == " ")
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

        if (strTemp == "�@" || strTemp == " " )
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
//�@�\�F		Trim all right spaces of value
//�����F        val
//		val	(I)
//�߂�l�F	Right trimed value
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

        if (strTemp == "�@" || strTemp == " " )
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
//�@�\�F		���t���Ó��Ȑ��l���`�F�b�N����
//�����F
//		val	(I)  ""
//�߂�l�F	true	�G���[  false
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
//�@�\�F		���p�p���̃`�F�b�N����
//�����F
//		val	(I)  ""
//�߂�l�F	true	�G���[  false
//====================================================================
function checkENValue(val){
	// set return value
	var res = false;

	// if input value is "" ,then return true.
	if(val == "") {
		res = true;
	} else {
		//���p���� ���p�A���t�@�x�b�g �}�b�`���鐳�K�\���I�u�W�F�N�g�쐬
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
// * �֐���		  �F���l���`�F�b�N
// * �֐� ID     : checkNumberValue (String val, int length)
// * �������e		�F���l���`�F�b�N����
// * ����		    �FblnRet =checkNumberValue(val, length);
// * ����		    �Fval	  �F �`�F�b�N�̒l
// * �߂�l		  �FblnRet
// *       true	�F����
// *			 false�F�ُ�
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
// * �֐���		  �F���l���`�F�b�N
// * �֐� ID     : checkNumberValue2 (String val)
// * �������e		�F���l���`�F�b�N����
// * ����		    �FblnRet =checkNumberValue2(val);
// * ����		    �Fval	  �F �`�F�b�N�̒l
// * �߂�l		  �FblnRet
// *       true	�F����
// *			 false�F�ُ�
// *
//******************************************************************************

function checkNumberValue2( val ) {
	return checkNumberValue(val,2);
}
//******************************************************************************
// * �֐���		  �F���l���`�F�b�N
// * �֐� ID     : checkNumberValue3 (String val)
// * �������e		�F���l���`�F�b�N����
// * ����		    �FblnRet =checkNumberValue2(val);
// * ����		    �Fval	  �F �`�F�b�N�̒l
// * �߂�l		  �FblnRet
// *       true	�F����
// *			 false�F�ُ�
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
// * �֐���		  �F���l���`�F�b�N
// * �֐� ID     : checkNumberValue4 (String val, int length)
// * �������e		�F���l���`�F�b�N����
// * ����		    �FblnRet =checkNumberValue4(val, length);
// * ����		    �Fval	  �F �`�F�b�N�̒l
// * �߂�l		  �FblnRet
// *       true	�F����
// *			 false�F�ُ�
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
// * �֐���		�F�`�m�j�ŕ����̒����ɂ����̓`�F�b�N
// * �֐� ID		�FcheckAnkLengthA (String val, int max)
// * �������e		�F�`�m�j�ŕ����̒����ɂ����̓`�F�b�N�i�S�p�������Q�����Ɛ�����j
// * ����		�FblnRet =checkAnkLength(val, max);
// * ����		�Fval	  �F �`�F�b�N�̒l
// *                                  max        �F �ő�l
// * �߂�l		�FblnRet
// *                                  true	�F����
// *			 false	�F�ُ�
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
    if (s1 >= "�" && s1 <="�") {
     	cnt +=1;	      //���p�J�i
    }else if (escape(s1).length >= 4) {
      cnt +=2;	      //�S�p
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