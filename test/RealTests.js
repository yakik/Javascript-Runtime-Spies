var Harness = require('../src/Harness')
var RuntimeSpy = require('../src/RuntimeSpy')
var SmartMock = require('../src/FunctionMock')
var VariableLiteral = require('../src/VariableLiteral')
var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect




mocha.describe('Real Test', function () {

    mocha.it('Number 1', function () {

       var Display =  function (place, doc, input) {

			var d = this;
			var dummyFunc=function(){ }
			dummyFunc()
	    this.input = input;
	    // Covers bottom-right square when both scrollbars are present.
	    d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
	    d.scrollbarFiller.setAttribute("cm-not-content", "true");
	    // Covers bottom of gutter when coverGutterNextToScrollbar is on
	    // and h scrollbar is present.
	    d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
	    d.gutterFiller.setAttribute("cm-not-content", "true");
	    // Will contain the actual code, positioned to cover the viewport.
	    d.lineDiv = elt("div", null, "CodeMirror-code");
	    // Elements are added to these to represent selection and cursors.
	    d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
	    d.cursorDiv = elt("div", null, "CodeMirror-cursors");
	    // A visibility: hidden element used to find the size of things.
	    d.measure = elt("div", null, "CodeMirror-measure");
	    // When lines outside of the viewport are measured, they are drawn in this.
	    d.lineMeasure = elt("div", null, "CodeMirror-measure");
	    // Wraps everything that needs to exist inside the vertically-padded coordinate system
	    d.lineSpace = elt("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
	                      null, "position: relative; outline: none");
	    // Moved around its parent to cover visible view.
	    d.mover = elt("div", [elt("div", [d.lineSpace], "CodeMirror-lines")], null, "position: relative");
	    // Set to the height of the document, allowing scrolling.
	    d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
	    d.sizerWidth = null;
	    // Behavior of elts with overflow: auto and padding is
	    // inconsistent across browsers. This is used to ensure the
	    // scrollable area is big enough.
	    d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
	    // Will contain the gutters, if any.
	    d.gutters = elt("div", null, "CodeMirror-gutters");
	    d.lineGutter = null;
	    // Actual scrollable element.
	    d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
	    d.scroller.setAttribute("tabIndex", "-1");
	    // The element in which the editor lives.
	    d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");
	
	    // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)
	    if (ie && ie_version < 8) { d.gutters.style.zIndex = -1; d.scroller.style.paddingRight = 0; }
	    if (!webkit && !(gecko && mobile)) d.scroller.draggable = true;
	
	    if (place) {
	      if (place.appendChild) place.appendChild(d.wrapper);
	      else place(d.wrapper);
	    }
	
	    // Current rendered range (may be bigger than the view window).
	    d.viewFrom = d.viewTo = doc.first;
	    d.reportedViewFrom = d.reportedViewTo = doc.first;
	    // Information about the rendered lines.
	    d.view = [];
	    d.renderedView = null;
	    // Holds info about a single rendered line when it was rendered
	    // for measurement, while not in view.
	    d.externalMeasured = null;
	    // Empty space (in pixels) above the view
	    d.viewOffset = 0;
	    d.lastWrapHeight = d.lastWrapWidth = 0;
	    d.updateLineNumbers = null;
	
	    d.nativeBarWidth = d.barHeight = d.barWidth = 0;
	    d.scrollbarsClipped = false;
	
	    // Used to only resize the line number gutter when necessary (when
	    // the amount of lines crosses a boundary that makes its width change)
	    d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
	    // Set to true when a non-horizontal-scrolling line widget is
	    // added. As an optimization, line widget aligning is skipped when
	    // this is false.
	    d.alignWidgets = false;
	
	    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
	
	    // Tracks the maximum line length so that the horizontal scrollbar
	    // can be kept static when scrolling.
	    d.maxLine = null;
	    d.maxLineLength = 0;
	    d.maxLineChanged = false;
	
	    // Used for measuring wheel scrolling granularity
	    d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
	
	    // True when shift is held down.
	    d.shift = false;
	
	    // Used to track whether anything happened since the context menu
	    // was opened.
	    d.selForContextMenu = null;
	
	    d.activeTouch = null;
			
			input.init(d);
			return d
	  }


        var myHarness = new Harness('myHarness')
        var mockRepositoryData = {}
        mockRepositoryData['elt'] = {input:[['div',null,'CodeMirror-scrollbar-filler'],['div',null,'CodeMirror-gutter-filler'],['div',null,'CodeMirror-code'],['div',null,null,'position: relative; z-index: 1'],['div',null,'CodeMirror-cursors'],['div',null,'CodeMirror-measure'],['div',null,'CodeMirror-measure'],['div',[{},{},{},{},{}],null,'position: relative; outline: none'],['div',[{}],'CodeMirror-lines'],['div',[{}],null,'position: relative'],['div',[{}],'CodeMirror-sizer'],['div',null,null,'position: absolute; height: 30px; width: 1px;'],['div',null,'CodeMirror-gutters'],['div',[{},{},{}],'CodeMirror-scroll'],['div',[{},{},{}],'CodeMirror'],['textarea',null,null,'position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none'],['div',[{}],null,'overflow: hidden; position: relative; width: 3px; height: 0px;']],output:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
        mockRepositoryData['dummyFunc'] = {input:[],output:[]}
        myHarness.setMockRepositoryData(mockRepositoryData)
        myHarness.addFunctionMock('elt')
        elt= function(){
        return myHarness.callFunctionSpy('elt',arguments,function(codeToEval){eval(codeToEval)})
        }
        myHarness.addFunctionMock('dummyFunc')
        dummyFunc= function(){
        return myHarness.callFunctionSpy('dummyFunc',arguments,function(codeToEval){eval(codeToEval)})
        }
        scrollerGap_DB = new Map([['Initial','scrollerGap = 30']])
        var scrollerGap
        
        myHarness.addGlobalVariableMock('scrollerGap',scrollerGap_DB)
        ie_DB = new Map([['Initial','ie = null']])
        var ie
        
        myHarness.addGlobalVariableMock('ie',ie_DB)
        ie_version_DB = new Map([['Initial','ie_version = null']])
        var ie_version
        
        myHarness.addGlobalVariableMock('ie_version',ie_version_DB)
        webkit_DB = new Map([['Initial','webkit = true']])
        var webkit
        
        myHarness.addGlobalVariableMock('webkit',webkit_DB)
        gecko_DB = new Map([['Initial','gecko = false']])
        var gecko
        
        myHarness.addGlobalVariableMock('gecko',gecko_DB)
        mobile_DB = new Map([['Initial','mobile = false']])
        var mobile
        
        myHarness.addGlobalVariableMock('mobile',mobile_DB)
        myHarness.updateVariablesByTag('Initial',function(codeToEval){eval(codeToEval)})
        DisplayParam0 = 
        DisplayParam1 = {children:[{lines:[{text:'let calculateAmortization = (principal, years, rate) => {',height:1},{text:'    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);',height:1},{text:'    let balance = principal;',height:1},{text:'    let amortization = [];',height:1},{text:'    for (let y=0; y<years; y++) {',height:1},{text:'        let interestY = 0;  //Interest payment for year y',height:1},{text:'        let principalY = 0; //Principal payment for year y',height:1},{text:'        for (let m=0; m<12; m++) {',height:1},{text:'            let interestM = balance * monthlyRate;       //Interest payment for month m',height:1},{text:'            let principalM = monthlyPayment - interestM; //Principal payment for month m',height:1},{text:'            interestY = interestY + interestM;',height:1},{text:'            principalY = principalY + principalM;',height:1},{text:'            balance = balance - principalM;',height:1},{text:'        }',height:1},{text:'        amortization.push({principalY, interestY, balance});',height:1},{text:'    }',height:1},{text:'    return {monthlyPayment, monthlyRate, amortization};',height:1},{text:'};',height:1},{text:'',height:1},{text:'',height:1}],height:20}],size:20,height:20,parent:null,first:0,scrollLeft:0,scrollTop:0,cantEdit:false,cleanGeneration:1,frontier:0,sel:{ranges:[{anchor:{line:0,ch:0},head:{line:0,ch:0}}],primIndex:0},history:{done:[{ranges:[{anchor:{line:0,ch:0},head:{line:0,ch:0}}],primIndex:0}],undone:[],undoDepth:Infinity,lastSelTime:1537726693544,lastModTime:0,lastSelOp:NaN,lastOp:null,lastSelOrigin:undefined,lastOrigin:null,maxGeneration:1,generation:1},id:1,modeOption:'javascript',lineSep:null,extend:false};DisplayParam1['children'][0]['lines'][0]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][1]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][2]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][3]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][4]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][5]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][6]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][7]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][8]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][9]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][10]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][11]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][12]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][13]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][14]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][15]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][16]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][17]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][18]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['lines'][19]['parent']=DisplayParam1['children'][0];DisplayParam1['children'][0]['parent']=DisplayParam1
        DisplayParam2 = {cm:{options:{viewportMargin:Infinity,matchBrackets:true,continueComments:'Enter',mode:'javascript',lineNumbers:true,value:'let calculateAmortization = (principal, years, rate) => {\n    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);\n    let balance = principal;\n    let amortization = [];\n    for (let y=0; y<years; y++) {\n        let interestY = 0;  //Interest payment for year y\n        let principalY = 0; //Principal payment for year y\n        for (let m=0; m<12; m++) {\n            let interestM = balance * monthlyRate;       //Interest payment for month m\n            let principalM = monthlyPayment - interestM; //Principal payment for month m\n            interestY = interestY + interestM;\n            principalY = principalY + principalM;\n            balance = balance - principalM;\n        }\n        amortization.push({principalY, interestY, balance});\n    }\n    return {monthlyPayment, monthlyRate, amortization};\n};\n\n',autofocus:false,indentUnit:2,indentWithTabs:false,smartIndent:true,tabSize:4,lineSeparator:null,specialChars:{},electricChars:true,inputStyle:'textarea',rtlMoveVisually:false,wholeLineUpdateBefore:true,theme:'default',keyMap:'default',extraKeys:null,lineWrapping:false,gutters:['CodeMirror-linenumbers'],fixedGutter:true,coverGutterNextToScrollbar:false,scrollbarStyle:'native',firstLineNumber:1,showCursorWhenSelecting:false,resetSelectionOnContextMenu:true,lineWiseCopyCut:true,readOnly:false,disableInput:false,dragDrop:true,allowDropFileTypes:null,cursorBlinkRate:530,cursorScrollMargin:0,cursorHeight:1,singleCursorHeightPerLine:true,workTime:100,workDelay:100,flattenSpans:true,addModeClass:false,pollInterval:100,undoDepth:200,historyEventDelay:1250,maxHighlightLength:10000,moveInputWithCursor:true,tabindex:null},doc:{children:[{lines:[{text:'let calculateAmortization = (principal, years, rate) => {',height:1},{text:'    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);',height:1},{text:'    let balance = principal;',height:1},{text:'    let amortization = [];',height:1},{text:'    for (let y=0; y<years; y++) {',height:1},{text:'        let interestY = 0;  //Interest payment for year y',height:1},{text:'        let principalY = 0; //Principal payment for year y',height:1},{text:'        for (let m=0; m<12; m++) {',height:1},{text:'            let interestM = balance * monthlyRate;       //Interest payment for month m',height:1},{text:'            let principalM = monthlyPayment - interestM; //Principal payment for month m',height:1},{text:'            interestY = interestY + interestM;',height:1},{text:'            principalY = principalY + principalM;',height:1},{text:'            balance = balance - principalM;',height:1},{text:'        }',height:1},{text:'        amortization.push({principalY, interestY, balance});',height:1},{text:'    }',height:1},{text:'    return {monthlyPayment, monthlyRate, amortization};',height:1},{text:'};',height:1},{text:'',height:1},{text:'',height:1}],height:20}],size:20,height:20,parent:null,first:0,scrollLeft:0,scrollTop:0,cantEdit:false,cleanGeneration:1,frontier:0,sel:{ranges:[{anchor:{line:0,ch:0},head:{line:0,ch:0}}],primIndex:0},history:{done:[{ranges:[{anchor:{line:0,ch:0},head:{line:0,ch:0}}],primIndex:0}],undone:[],undoDepth:Infinity,lastSelTime:1537726693544,lastModTime:0,lastSelOp:NaN,lastOp:null,lastSelOrigin:undefined,lastOrigin:null,maxGeneration:1,generation:1},id:1,modeOption:'javascript',lineSep:null,extend:false}},prevInput:'',pollingFast:false,polling:{id:null},inaccurateSelection:false,hasSelection:false,composing:null};DisplayParam2['cm']['doc']['children'][0]['lines'][0]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][1]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][2]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][3]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][4]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][5]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][6]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][7]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][8]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][9]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][10]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][11]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][12]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][13]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][14]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][15]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][16]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][17]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][18]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['lines'][19]['parent']=DisplayParam2['cm']['doc']['children'][0];DisplayParam2['cm']['doc']['children'][0]['parent']=DisplayParam2['cm']['doc']
        expect(VariableLiteral.getVariableLiteral(Display(DisplayParam0, DisplayParam1, DisplayParam2)
        ).getLiteralAndCyclicDefinition('result')).equals('result = {input:{cm:{options:{viewportMargin:Infinity,matchBrackets:true,continueComments:\'Enter\',mode:\'javascript\',lineNumbers:true,value:\'let calculateAmortization = (principal, years, rate) => {\n    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);\n    let balance = principal;\n    let amortization = [];\n    for (let y=0; y<years; y++) {\n        let interestY = 0;  //Interest payment for year y\n        let principalY = 0; //Principal payment for year y\n        for (let m=0; m<12; m++) {\n            let interestM = balance * monthlyRate;       //Interest payment for month m\n            let principalM = monthlyPayment - interestM; //Principal payment for month m\n            interestY = interestY + interestM;\n            principalY = principalY + principalM;\n            balance = balance - principalM;\n        }\n        amortization.push({principalY, interestY, balance});\n    }\n    return {monthlyPayment, monthlyRate, amortization};\n};\n\n\',autofocus:false,indentUnit:2,indentWithTabs:false,smartIndent:true,tabSize:4,lineSeparator:null,specialChars:{},electricChars:true,inputStyle:\'textarea\',rtlMoveVisually:false,wholeLineUpdateBefore:true,theme:\'default\',keyMap:\'default\',extraKeys:null,lineWrapping:false,gutters:[\'CodeMirror-linenumbers\'],fixedGutter:true,coverGutterNextToScrollbar:false,scrollbarStyle:\'native\',firstLineNumber:1,showCursorWhenSelecting:false,resetSelectionOnContextMenu:true,lineWiseCopyCut:true,readOnly:false,disableInput:false,dragDrop:true,allowDropFileTypes:null,cursorBlinkRate:530,cursorScrollMargin:0,cursorHeight:1,singleCursorHeightPerLine:true,workTime:100,workDelay:100,flattenSpans:true,addModeClass:false,pollInterval:100,undoDepth:200,historyEventDelay:1250,maxHighlightLength:10000,moveInputWithCursor:true,tabindex:null},doc:{children:[{lines:[{text:\'let calculateAmortization = (principal, years, rate) => {\',height:1},{text:\'    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);\',height:1},{text:\'    let balance = principal;\',height:1},{text:\'    let amortization = [];\',height:1},{text:\'    for (let y=0; y<years; y++) {\',height:1},{text:\'        let interestY = 0;  //Interest payment for year y\',height:1},{text:\'        let principalY = 0; //Principal payment for year y\',height:1},{text:\'        for (let m=0; m<12; m++) {\',height:1},{text:\'            let interestM = balance * monthlyRate;       //Interest payment for month m\',height:1},{text:\'            let principalM = monthlyPayment - interestM; //Principal payment for month m\',height:1},{text:\'            interestY = interestY + interestM;\',height:1},{text:\'            principalY = principalY + principalM;\',height:1},{text:\'            balance = balance - principalM;\',height:1},{text:\'        }\',height:1},{text:\'        amortization.push({principalY, interestY, balance});\',height:1},{text:\'    }\',height:1},{text:\'    return {monthlyPayment, monthlyRate, amortization};\',height:1},{text:\'};\',height:1},{text:\'\',height:1},{text:\'\',height:1}],height:20}],size:20,height:20,parent:null,first:0,scrollLeft:0,scrollTop:0,cantEdit:false,cleanGeneration:1,frontier:0,sel:{ranges:[{anchor:{line:0,ch:0},head:{line:0,ch:0}}],primIndex:0},history:{done:[{ranges:[{anchor:{line:0,ch:0},head:{line:0,ch:0}}],primIndex:0}],undone:[],undoDepth:Infinity,lastSelTime:1537726693544,lastModTime:0,lastSelOp:NaN,lastOp:null,lastSelOrigin:undefined,lastOrigin:null,maxGeneration:1,generation:1},id:1,modeOption:\'javascript\',lineSep:null,extend:false}},prevInput:\'\',pollingFast:false,polling:{id:null},inaccurateSelection:false,hasSelection:false,composing:null,wrapper:{},textarea:{}},scrollbarFiller:{},gutterFiller:{},lineDiv:{},selectionDiv:{},cursorDiv:{},measure:{},lineMeasure:{},lineSpace:{},mover:{},sizer:{},sizerWidth:null,heightForcer:{},gutters:{},lineGutter:null,scroller:{},wrapper:{},viewTo:0,viewFrom:0,reportedViewTo:0,reportedViewFrom:0,view:[],renderedView:null,externalMeasured:null,viewOffset:0,lastWrapWidth:0,lastWrapHeight:0,updateLineNumbers:null,barWidth:0,barHeight:0,nativeBarWidth:0,scrollbarsClipped:false,lineNumChars:null,lineNumInnerWidth:null,lineNumWidth:null,alignWidgets:false,cachedPaddingH:null,cachedTextHeight:null,cachedCharWidth:null,maxLine:null,maxLineLength:0,maxLineChanged:false,wheelStartY:null,wheelStartX:null,wheelDY:null,wheelDX:null,shift:false,selForContextMenu:null,activeTouch:null};result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][0][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][1][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][2][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][3][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][4][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][5][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][6][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][7][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][8][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][9][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][10][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][11][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][12][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][13][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][14][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][15][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][16][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][17][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][18][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'lines\'][19][\'parent\']=result[\'input\'][\'cm\'][\'doc\'][\'children\'][0];result[\'input\'][\'cm\'][\'doc\'][\'children\'][0][\'parent\']=result[\'input\'][\'cm\'][\'doc\']')
           })
}  )  