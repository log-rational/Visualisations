/*
 color #0: rgba(255,135,0,0.3)
 color #1: rgba(239,255,0,0.3)
 color #2: rgba(104,255,0,0.3)
 color #3: rgba(0,255,32,0.3)
 color #4: rgba(0,255,167,0.3)
 color #5: rgba(0,207,255,0.3)
 color #6: rgba(0,72,255,0.3)
 color #7: rgba(64,0,255,0.3)
 */

data = {
	"title" : "<h2>Recursion and factorials</h2>",
	"startOffset" : 0,
	"info" : "<h2>Information</h2><ul><li>Click Next to go to the next step.</li><li>Click Previous to go to the preceding step.</li><li>Select Reset to go back to the start of the visualisation.</li><li>Press Audio to toggle audio narration on or off.</li></ul>",
	"orderingProperty" : false,
	"forcePortrait" : false,
	"forceLandscape" : true,
	"steps" : [
	//0: example function
	{
		//"audio": "data/audio/m269_recursion_01.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : { },
		"stack" : [],
		"description" : "<p>In this visualisation we are going to see how recursion works.</p><p>To understand it we are going to begin by looking at how function calls work.</p>"
	},
	//1
	{
		//"audio" : "data/audio/m269_recursion_02.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : { },
		"stack" : [],
		"description" : "<p>Unit 3 explains how whenever a function is called, a data structure called a stack frame is created to store the function’s local variables and arguments.</p><p>In practice other data is stored in a stack frame as well, but for this visualisation we will say that the stack frame consists of arguments and local variables.</p>"
	},
	//1a
	{
		//"audio" : "data/audio/m269_recursion_02.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : { },
		"stack" : [],
		"description" : "<p>This stack frame is then pushed on to a special Python stack called an execution stack (other terms are call stack or run-time stack).</p><p>The stack frame is only popped off the execution stack when the function completes its execution.</p>"
	},
	//2
	{
		//"audio" : "data/audio/m269_recursion_03.mp3",
		"codeLines" : ["def exampleFunction<span style=\"font-weight:bold\">(<span class='boxed'>arg1</span>, <span class='boxed'>arg2</span>, <span class='boxed'>arg3</span>)</span>: ", "    i = arg1 * 2", "    j = arg2 * 3", "    result = i + j + arg3", "    return result", "", "exampleResult = exampleFunction<span style=\"font-weight:bold\">(4, 2, 2)</span>"],
		"codeHighlights" : {
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : [],
		"description" : "<p>Let’s begin by looking at an example of a function called <code>exampleFunction()</code>. The function takes three arguments <code>arg1</code>, <code>arg2</code>, <code>arg3</code>.</p>"
	},
	//3
	{
		//"audio" : "data/audio/m269_recursion_04.mp3",
		"codeLines" : ["def exampleFunction(arg1, arg2, arg3): ", "    <span class='boxed'>i</span> = arg1 * 2", "    <span class='boxed'>j</span> = arg2 * 3", "    <span class='boxed'>result</span> = i + j + arg3", "    return result", "", "exampleResult = exampleFunction(4, 2, 2)"],
		"codeHighlights" : {
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : [],
		"description" : "<p>The function also has three variables <code>i</code>, <code>j</code> and <code>result</code>.</p><p>Let’s look at what happens when <code>exampleFunction()</code> is called.</p>"
	},
	//4
	{
		//"audio" : "data/audio/m269_recursion_05.mp3",
		"codeLines" : ["def exampleFunction(arg1, arg2, arg3): ", "    i = arg1 * 2", "    j = arg2 * 3", "    result = i + j + arg3", "    return result", "", "exampleResult = exampleFunction(4, 2, 2)"],
		"codeHighlights" : {
			0 : "rgba(239,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>arg1 = 4</td><td>i = ?</td></tr><tr><td>arg2 = 2</td><td>j = ?</td></tr><tr><td>arg3 = 2</td><td>result = ?</td></table>"],
		"stackOffset" : 1,
		"description" : "<p>When the function is called, a stack frame in yellow is created to hold the actual arguments <code>arg1</code>, <code>arg2</code> and <code>arg3</code>, plus the local variables <code>i</code>, <code>j</code> and <code>result</code>.</p><p>The formal arguments are set to the values of the actual arguments given in the function call.</p><p>The stack frame is then pushed onto the execution stack.</p>"
	},
	//5
	{
		//"audio" : "data/audio/m269_recursion_06a.mp3",
		"codeLines" : ["def exampleFunction(arg1, arg2, arg3): ", "    i = arg1 * 2", "    j = arg2 * 3", "    result = i + j + arg3", "    return result", "", "exampleResult = exampleFunction(4, 2, 2)"],
		"codeHighlights" : {
			1 : "rgba(239,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>arg1 = 4</td><td>i = 8</td></tr><tr><td>arg2 = 2</td><td>j = ?</td></tr><tr><td>arg3 = 2</td><td>result = ?</td></table>"],
		"stackOffset" : 1,
		"description" : "<p>As the function runs, the values for the local variables (held in the stack frame) are filled in.</p><p>Here <code>arg1</code> which is 4 is multiplied by 2 and the result 8 is stored into the variable <code>i</code>.</p>"
	},
	//6
	{
		//"audio" : "data/audio/m269_recursion_06b.mp3",
		"codeLines" : ["def exampleFunction(arg1, arg2, arg3): ", "    i = arg1 * 2", "    j = arg2 * 3", "    result = i + j + arg3", "    return result", "", "exampleResult = exampleFunction(4, 2, 2)"],
		"codeHighlights" : {
			2 : "rgba(239,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>arg1 = 4</td><td>i = 8</td></tr><tr><td>arg2 = 2</td><td>j = 6</td></tr><tr><td>arg3 = 2</td><td>result = ?</td></table>"],
		"stackOffset" : 1,
		"description" : "<p><code>j</code> becomes set to the result of multiplying the value of <code>arg2</code> which is 2 by 3 to give the value 6.</p><p>The value of the variable <code>result</code> becomes set to the result of adding <code>i + j + arg3</code> to give the value 16.</p>"
	},
	//7
	{
		//"audio" : "data/audio/m269_recursion_06c.mp3",
		"codeLines" : ["def exampleFunction(arg1, arg2, arg3): ", "    i = arg1 * 2", "    j = arg2 * 3", "    result = i + j + arg3", "    return result", "", "exampleResult = exampleFunction(4, 2, 2)"],
		"codeHighlights" : {
			3 : "rgba(239,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>arg1 = 4</td><td>i = 8</td></tr><tr><td>arg2 = 2</td><td>j = 6</td></tr><tr><td>arg3 = 2</td><td>result = 16</td></table>"],
		"stackOffset" : 1,
		"description" : "<p>The return statement returns the value of <code>result</code> which is assigned to the variable <code>exampleResult</code>.</p><p>The function then ends and its stack frame is popped from the stack and discarded. Its arguments and variables stop existing.</p>"
	},
	//9: cost of dollars
	{
		//"audio" : "data/audio/m269_recursion_07.mp3",
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {},
		"stack" : [],
		"description" : "<p>So to recap, when a function is called its arguments and variables are stored in a stack frame and pushed on to the call stack. The stack frame remains on the call stack until the function ends its execution, whereupon its stack frame is popped from the stack and discarded.</p><p>To make things clear let’s look at an assignment statement which involves two functions one calling the other.</p>"
	},
	//11
	{
		//"audio" : "data/audio/m269_recursion_09.mp3",
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			0 : "rgba(239,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = ?, commission = ?</td><td>dollars = 100</td></tr><tr><td>result = ?</td><td></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p><code>costOfDollars()</code> is called with <code>dollars</code> = 100. A new frame is created for the argument and local variables in the function.</p>"
	},
	//12
	{
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			1 : "rgba(239,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = ?</td><td>dollars = 100</td></tr><tr><td>result = ?</td><td></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p></p>"
	},
	//13
	{
		//"audio" : "data/audio/m269_recursion_10.mp3",
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			2 : "rgba(239,255,0,0.3)",
			6 : "rgba(104,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = ?</td><td>dollars = 100</td></tr><tr><td>result = ?</td><td></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>When <code>costOfDollars()</code> gets to the line which calls the <code>calcCommission()</code> function, this function is called with the argument 60.0. A new stack frame is pushed on to the stack for this function call.</p>"
	},
	//14
	{
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			2 : "rgba(239,255,0,0.3)",
			6 : "rgba(104,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = ?</td><td>dollars = 100</td></tr><tr><td>result = ?</td><td></td></tr></table>", "<table><tr><td>result = ?</td><td>sterlingCost = 60.0</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p></p>"
	},
	//15
	{
		//"audio" : "data/audio/m269_recursion_11.mp3",
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			2 : "rgba(239,255,0,0.3)",
			6 : "rgba(104,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = ?</td><td>dollars = 100</td></tr><tr><td>result = ?</td><td></td></tr></table>", "<table><tr><td>result = ?</td><td>sterlingCost = 60.0</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p><code>calcCommission()</code> creates a new stack frame. Notice that even though <code>calcCommission()</code> has a variable also called <code>sterlingCost</code> and also has a variable <code>result</code>, <!--not to mention argument <code>dollars</code>, -->they are all separate variables and can hold completely different values.</p>"
	},
	//15
	{
		//"audio" : "data/audio/m269_recursion_12.mp3",
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			2 : "rgba(239,255,0,0.3)",
			6 : "rgba(104,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = ?</td><td>dollars = 100</td></tr><tr><td>result = ?</td><td></td></tr></table>", "<table><tr><td>result = ?</td><td>sterlingCost = 60.0</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>As we move through <code>calcCommission()</code> we can even put another value in result that is completely separate from the result in the <code>costOfDollars()</code> function. This is because they exist in different stack frames.</p>"
	},
	//16
	{
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			2 : "rgba(239,255,0,0.3)",
			7 : "rgba(104,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = ?</td><td>dollars = 100</td></tr><tr><td>result = ?</td><td></td></tr></table>", "<table><tr><td>result = 6.0</td><td>sterlingCost = 60.0</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p></p>"
	},
	//17
	{
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			2 : "rgba(239,255,0,0.3)",
			8 : "rgba(104,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = ?</td><td>dollars = 100</td></tr><tr><td>result = ?</td><td></td></tr></table>", "<table><tr><td>result = 6.0</td><td>sterlingCost = 60.0</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p></p>"
	},
	//18
	{
		//"audio" : "data/audio/m269_recursion_13.mp3",
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			2 : "rgba(239,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = 6.0</td><td>dollars = 100</td></tr><tr><td>result = ?</td><td></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>When the <code>calcCommission()</code> function completes the frame is popped off the top of the stack and is discarded. The return value called <code>result</code> is then put into the <code>commission</code> variable. The separate value of <code>result</code> belonging to <code>costOfDollars()</code> is computed and the result is returned.</p>"
	},
	//19
	{
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			3 : "rgba(239,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = 6.0</td><td>dollars = 100</td></tr><tr><td>result = 66.0</td><td></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p></p>"
	},
	//20
	{
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			4 : "rgba(239,255,0,0.3)",
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td>sterlingCost = 60.0, commission = 6.0</td><td>dollars = 100</td></tr><tr><td>result = 66.0</td><td></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p></p>"
	},
	//21
	{
		//"audio" : "data/audio/m269_recursion_14.mp3",
		"codeLines" : ["def costOfDollars(dollars):", "    sterlingCost = dollars * 0.6", "    commission = calcCommission(sterlingCost)", "    result = sterlingCost + commission", "    return result", "", "def calcCommission(sterlingCost):", "    result = sterlingCost * 0.1", "    return result", "", "cost = costOfDollars(100)"],
		"codeHighlights" : {
			10 : "rgba(255,135,0,0.3)"
		},
		"stack" : [],
		"description" : "<p>Finally the function <code>costOfDollars()</code> completes and its stack frame is popped off the stack. The result 66.0 is assigned to the variable <code>cost</code>.</p>"
	},
	//22
	{
		//"audio" : "data/audio/m269_recursion_15.mp3",
		"codeLines" : [],
		"codeHighlights" : {},
		"stack" : [],
		"description" : "<h4>Stack frames</h4><p>So hopefully you have seen that when one function calls another which calls another each function gets its own frame for its local variables and arguments, which are separate to the all the others above and below.</p>"
	},
	//23
	{
		//"audio" : "data/audio/m269_recursion_16.mp3",
		"codeLines" : [],
		"codeHighlights" : {},
		"stack" : [],
		"description" : "<h4>The factorial</h4><p>Next we are going to look at the case of what happens when a function calls itself.</p><p>One of the most important functions in mathematics is the factorial function. It is so common that we give it its own special notation, writing N! with an exclamation mark to indicate the factorial of N.</p>"
	},
	//24
	{
		//"audio" : "data/audio/m269_recursion_17.mp3",
		"codeLines" : [],
		"codeHighlights" : {},
		"stack" : [],
		"description" : "<h3 style=\"font-size:32px\">N!</h3><p>The factorial of a positive integer N is easy to calculate.</p>"
	},
	//25
	{
		//"audio" : "data/audio/m269_recursion_18.mp3",
		"codeLines" : [],
		"codeHighlights" : {},
		"stack" : [],
		"description" : "<p>The factorial of a positive integer N is the product of all the positive integers less than or equal to N.</p><p>So for example, the factorial of 6 is: 6 * 5 * 4 * 3 * 2 * 1</p><p>which evaluates to 720.</p>"
	},
	//26: factorial function
	{
		//"audio" : "data/audio/m269_recursion_19a.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)"],
		"codeHighlights" : {},
		"stack" : [],
		"description" : "<p>Let’s look at the <code>factorial()</code> function. Notice it takes an argument <code>N</code>.</p><p>Let’s look at the code in the body of the function line by line.</p>"
	},
	//28: factorial function
	{
		//"audio" : "data/audio/m269_recursion_19b.mp3",
		"codeLines" : ["def factorial(N):", /*"    assert N > 0",*/"    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)"],
		"codeHighlights" : {
			1 : "rgba(200, 200, 200, 0.3)"
		},
		"stack" : [],
		"description" : "<p>The second line, if <code>N</code> is less than or equal to 1, is the function’s base case. Remember all recursive functions must have a base case, this is the condition that will stop the function from going on for ever.</p>"
	},
	//29: factorial function
	{
		//"audio" : "data/audio/m269_recursion_19c.mp3",
		"codeLines" : ["def factorial(N):", /*"    assert N > 0",*/"    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)"],
		"codeHighlights" : {
			2 : "rgba(200, 200, 200, 0.3)"
		},
		"stack" : [],
		"description" : "<p>The third line is what happens when the base case is reached; in this case the function simply returns 1.</p>"
	},
	//30: factorial function
	{
		//"audio" : "data/audio/m269_recursion_19d.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)"],
		"codeHighlights" : {
			3 : "rgba(200, 200, 200, 0.3)",
			4 : "rgba(200, 200, 200, 0.3)"
		},
		"stack" : [],
		"description" : "<p>Lines 4 and 5 are the <code>else</code> part of the <code>if</code> statement. When <code>N</code> is greater than 1 these lines return the result of N multiplied by the result of calling <code>factorial()</code> (that is itself) with an argument of <code>N - 1</code>.</p>"
	},
	//31
	{
		//"audio" : "data/audio/m269_recursion_20a.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			0 : "rgba(239,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>Let’s see what happens when we call <code>factorial()</code> with the argument 6.</p>"
	},
	//32
	{
		//"audio" : "data/audio/m269_recursion_20b.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			1 : "rgba(239,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p><code>factorial()</code> checks the argument <code>N</code> (which is 6) to see if it’s less than or equal to 1. It isn’t.</p>"
	},
	//33
	{
		//"audio" : "data/audio/m269_recursion_20c.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			3 : "rgba(239,255,0,0.3)",
			4 : "rgba(239,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>So <code>factorial()</code> calls itself with the argument 6 minus 1, that is the argument 5.</p>"
	},
	//34: 2nd stack frame
	{
		//"audio" : "data/audio/m269_recursion_21a.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			1 : "rgba(104,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>A new stack frame is made and pushed on top of the other one.</p><p>This separate version of <code>factorial()</code> checks the argument to see if it’s less than or equal to 1.</p>"
	},
	//35
	{
		//"audio" : "data/audio/m269_recursion_21b.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			3 : "rgba(104,255,0,0.3)",
			4 : "rgba(104,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>It isn’t so it then calls itself with the argument 5 minus 1 or 4.</p>"
	},
	//36: 3rd stack frame
	{
		//"audio" : "data/audio/m269_recursion_22a.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			1 : "rgba(0,255,32,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>This creates a new stack frame.</p><p><code>factorial()</code> checks the argument 4 to see if it’s less than or equal to 1."
	},
	//37
	{
		//"audio" : "data/audio/m269_recursion_22b.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			3 : "rgba(0,255,32,0.3)",
			4 : "rgba(0,255,32,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>It then calls itself with the argument 4 minus 1 or 3.</p>"
	},
	//38: 4th stack frame
	{
		//"audio" : "data/audio/m269_recursion_23a.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			1 : "rgba(0,255,167,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(3)</td><td>N = 3</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p><code>factorial()</code> checks the argument 3 to see if it’s less than or equal to 1.</p>"
	},
	//39
	{
		//"audio" : "data/audio/m269_recursion_23b.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			3 : "rgba(0,255,167,0.3)",
			4 : "rgba(0,255,167,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(3)</td><td>N = 3</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>It then calls itself with the argument 3 minus 1 or 2.</p>"
	},
	//40: 5th stack frame
	{
		//"audio" : "data/audio/m269_recursion_24a.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			1 : "rgba(0,207,255,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(3)</td><td>N = 3</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(2)</td><td>N = 2</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>The Python interpreter creates a new stack frame. The <code>factorial()</code> function checks the argument 2 to see if it’s less than or equal to 1.</p>"
	},
	//41
	{
		//"audio" : "data/audio/m269_recursion_24b.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			3 : "rgba(0,207,255,0.3)",
			4 : "rgba(0,207,255,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(3)</td><td>N = 3</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(2)</td><td>N = 2</td><td class='blank'></td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>It then calls itself with the argument 2 minus 1 or 1.</p>"
	},
	//42: 6th and final stack frame
	{
		//"audio" : "data/audio/m269_recursion_25.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			1 : "rgba(0,72,255,0.3)",
			2 : "rgba(0,72,255,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(3)</td><td>N = 3</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(2)</td><td>N = 2</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(1)</td><td>N = 1</td><td class='blank'>return 1</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>The <code>factorial()</code> function checks the argument 1 to see if it’s less than or equal to 1.</p><p>This time N is 1, which is less than or equal to 1,  so the base case is reached and the function returns 1.</p><p>Given we have reached the end of the function the stack frame is popped off the stack.</p>"
	},
	//43: f(2) returns
	{
		//"audio" : "data/audio/m269_recursion_26.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			4 : "rgba(0,207,255,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td></tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'></td>    </tr></table>", "<table><tr><td class='blank'>factorial(3)</td><td>N = 3</td><td class='blank'></td>    </tr></table>", "<table><tr><td class='blank'>factorial(2)</td><td>N = 2</td><td class='blank'>return N * 1 = 2</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>The previous calling function, <code>factorial(2)</code>, now gets control back. This function returns <code>N * factorial(1)</code>, for <code>N = 2</code>. From the popped stack frame it is provided with the value 1 for <code>factorial(1)</code>. Thus, it returns 2 * 1. In other words, it returns the value 2.</p>"
	},
	//44: f(3) returns
	{
		//"audio" : "data/audio/m269_recursion_27.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			4 : "rgba(0,255,167,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td>    </tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td>    </tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'></td>    </tr></table>", "<table><tr><td class='blank'>factorial(3)</td><td>N = 3</td><td class='blank'>return N * 2 = 6</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>The popped stack frame for <code>factorial(2)</code> is discarded. Its value, 2, is passed to the previous calling function, <code>factorial(3)</code>. This function multiplies 2 by 3 and returns the value 6.</p>"
	},
	//45: f(4) returns
	{
		//"audio" : "data/audio/m269_recursion_28.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			4 : "rgba(0,255,32,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td>    </tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'></td>    </tr></table>", "<table><tr><td class='blank'>factorial(4)</td><td>N = 4</td><td class='blank'>return N * 6 = 24</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>The popped stack frame for <code>factorial(3)</code> is discarded. Its value, 6, is passed to the previous calling function, <code>factorial(4)</code>. This function multiplies 6 by 4 and returns the value 24."
	},
	//46: f(5) returns
	{
		//"audio" : "data/audio/m269_recursion_29.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			4 : "rgba(104,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'></td>    </tr></table>", "<table><tr><td class='blank'>factorial(5)</td><td>N = 5</td><td class='blank'>return N * 24 = 120</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>Another stack frame is discarded and the value 24 is passed to the previous calling function. It takes control back and multiplies 24 by 5, returning 120.</p>"
	},
	//47: f(6) returns
	{
		//"audio" : "data/audio/m269_recursion_30.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {
			4 : "rgba(239,255,0,0.3)",
			6 : "rgba(255,135,0,0.3)"
		},
		"stack" : ["<table><tr><td class='blank'>factorial(6)</td><td>N = 6</td><td class='blank'>return N * 120 = 720</td></tr></table>"],
		"stackOffset" : 1,
		"description" : "<p>The penultimate stack frame is discarded. Its calling function returns 120 to the original call of the <code>factorial()</code> function. 120 is multiplied by 6 and 720 is returned.</p><p>The final factorial function call has been completed and the last stack frame is now popped off the stack and discarded.</p>"
	},
	//48: calling function
	{
		//"audio" : "data/audio/m269_recursion_31.mp3",
		"codeLines" : ["def factorial(N):", "    if N <= 1:", "        return 1", "    else:", "        return N * factorial(N - 1)", "", "factorialResult = factorial(6)"],
		"codeHighlights" : {},
		"stack" : [],
		"description" : "<p>So the final value computed for <code>factorial(6)</code> is 720, which is assigned to the variable <code>factorialResult</code>.</p>"
	},
	//49
	{
		//"audio" : "data/audio/m269_recursion_32.mp3",
		"codeLines" : [],
		"codeHighlights" : { },
		"stack" : [],
		"description" : "<h3>Summary</h3><p>Firstly, you were shown how a function call results in the creation of a stack frame in which the function’s local variables and arguments are stored.</p>"
	},
	//49a
	{
		//"audio" : "data/audio/m269_recursion_32.mp3",
		"codeLines" : [],
		"codeHighlights" : { },
		"stack" : [],
		"description" : "<h3>Summary</h3><p>Secondly, you saw what happens when one function calls another one: separate stack frames are created for each function call.</p>"
	},
	//49b
	{
		//"audio" : "data/audio/m269_recursion_32.mp3",
		"codeLines" : [],
		"codeHighlights" : { },
		"stack" : [],
		"description" : "<h3>Summary</h3><p>Thirdly, you were shown how a recursive function is executed:</p><p>The function calls itself until the base case is reached. With each call, a new stack frame is created and pushed on top of the previous one.</p>"
	},
	//49c
	{
		//"audio" : "data/audio/m269_recursion_32.mp3",
		"codeLines" : [],
		"codeHighlights" : { },
		"stack" : [],
		"description" : "<h3>Summary</h3><p>After the base case is reached, the stack frames are popped off the stack, one at a time. The value for a function call associated with a stack frame is passed to the previous function call. This continues until we arrive at the original function call. Now, the call of the recursive function is complete and its value is returned.</p>"
	},
	//50
	{
		//"audio" : "data/audio/m269_recursion_33.mp3",
		"codeLines" : [],
		"codeHighlights" : { },
		"stack" : [],
		"description" : "<h3></h3><p>This concludes the visualisation.</p>"
	}]
}
