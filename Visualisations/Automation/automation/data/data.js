data = {
    //background:"bg.png",
    background:"images/background.png",
    description:"Interactive quiz involving dragging labels onto a diagram.",
    instructions:"",
    correctAnswers:[ //all correct answers, relate to name of dragbox
        {ans:"mathematical,create,automate,tells"}
        
    ],
	showCorrect:[1,2,0,3],
    correctFeedback:"",
    //general incorrect answer feedback message
    generalFeedback:"",
    //general incorrect answer feedback message
    finalFeedback:"The correct answer is now shown. <br/><br/>\n\
                    Make sure you carefully read Wing’s sentence. Notice that it \n\
                    contains three key verbs (‘abstracting/creating’, ‘automating’, \n\
                    and ‘tells’). These represent actions or events. Ask yourself \n\
                    whether these are best represented by arrows or by boxes. The \n\
                    sentence also contains two key noun phrases, in particular, \n\
                    ‘physical-world phenomenon’ and ‘mathematical model’ that refer \n\
                    to things. Again, think about whether these are best \n\
                    represented by a box or an arrow. ",
    //specific incorrect answer feedback messages
    specificFeedback:["Place the text items above the correct dashed lines."],
    //specific incorrect answers to check for
    specificIncorrectAnswers:[
    {
        ans:",,,",
        fbid:0 //index of specific incorrect feedback message
    }
    ],
    //dims of the feedback popup
    feedbackArea:{
        x:0.05,
        y:0.05,
        w:0.9,
        h:0.8
    },
    defaultStartingPosition:{
        x:100,
        y:200
    },
	maxAttempts:3,
    preload:true, // set true to have all items on screen to start with, instead of feeding in
    enlargeWhenDragging:false,
    dragboxes:[ //dims of dragboxes relative to original image, rescaled in code
    {//0
        name:"create",
        img:"images/create.png",
        label:"A",
        x:750,
        y:130,
        w:206,
        h:81
    },
    {//1
        name:'tells',
        img:"images/tells.png",
        label:"B",
        x:50,
        y:40,
        w:206,
        h:81
    },
    {//2
        name:"automate",
        img:"images/automate.png",
        label:"C",
        x:0,
        y:130,
        w:206,
        h:81
    },
    {//3
        name:"mathematical",
        img:"images/mathematical.png",
        label:"D",
        x:700,
        y:40,
        w:206,
        h:81
    },
    ],

    dropboxes: [ //dropboxes with dims relative to original size of image, rescaled in code
    {
        name:"target0",
        label:"label0",
        x:354,
        y:68,
        w:206,
        h:81
    },
    {
        name:"target1",
        label:"label1",
        x:65,
        y:215,
        w:206,
        h:81
    },
    {
        name:"target2",
        label:"label2",
        x:665,
        y:215,
        w:206,
        h:81
    },
    {
        name:"target3",
        label:"label3",
        x:373,
        y:446,
        w:206,
        h:81
    },
    ]    
};
