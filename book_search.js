/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
function findSearchTermInBooks(searchTerm, scannedTextObj) {

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    // store temp ISBN
    var tempISBN = "";


    // recursively search through scannedTextObj, looking for Text that contains searchTerm (case sensitive)
    // If found, add the ISBN, Page, and Line to the result object.

    function search(obj) {
        // get ISBN
        if (obj.hasOwnProperty("ISBN")) {
            tempISBN = obj.ISBN;
        }
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key == "Text") {
                    // matching is case sensitive
                    if (obj[key].includes(searchTerm)) {
                        result.SearchTerm = searchTerm;
                        result.Results.push({
                            "ISBN": tempISBN,
                            "Page": obj.Page,
                            "Line": obj.Line
                        });
                    }
                } else if (typeof obj[key] == "object") {
                    search(obj[key]);
                }
            }
        }
    }

    search(scannedTextObj);
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** We would also want to test that matched results consider case. 
 * e.g. "the" should not match "The"
*/
const test3result = findSearchTermInBooks("Asked", twentyLeaguesIn);
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 0);
    console.log("Received:", test3result.Results.length);
}

/** We should test that input matches our specified schema. */
// check that the input object has the fields we expect
const test4result = twentyLeaguesIn;
if (test4result[0].hasOwnProperty("Title") && test4result[0].hasOwnProperty("ISBN") && test4result[0].hasOwnProperty("Content")) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", "Title, ISBN, and Content");
    console.log("Received:", test4result);
}

/** We should test that output matches our specified schema. */
// check that the output object has the fields we expect
const test5result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test5result.hasOwnProperty("SearchTerm") && test5result.hasOwnProperty("Results")) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", "SearchTerm and Results");
    console.log("Received:", test5result);
}
