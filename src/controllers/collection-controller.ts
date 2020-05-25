import { Request, Response } from "express";
import { Collection, Item } from 'postman-collection';
import * as newman from 'newman';
import { NewmanRunSummary } from "newman";

var items = [
    new Item({
        name: "GET-employees",
        events: [
            {
                listen: "test",
                script: {
                    exec: [
                        "var response = pm.response.json();\r",
                        "var responseDataSize = response.data.length\r",
                        "pm.test(\"Response Size should be 24\", function () {\r",
                        "    pm.expect(responseDataSize).to.equal(4);\r",
                        "});"
                    ],
                    type: "text/javascript"
                }
            }
        ],
        request: {
            method: "GET",
            header: [],
            url: "http://dummy.restapiexample.com/api/v1/employees",
        },
    })
]

var myCollection = new Collection({
    info: {
        name: "Test-automation-framework",
    },
    item: items,
})

export const index = (req: Request, res: Response) => {

    newman.run({
        collection: myCollection,
        reporters: 'json'
    }, function (err: any, summary: NewmanRunSummary) {
        if (err) {
            res.send(err);
        } else {
            res.send(summary);
        }
    });
};

