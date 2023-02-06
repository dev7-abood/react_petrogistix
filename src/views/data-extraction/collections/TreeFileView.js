import FileTree from "react-file-treeview";
import {useState} from 'react'

const TreeFileView = _ => {
    //create tree data*


    const data = {
        name: "treeview",
        id: 1,
        toggled: true,
        child: [
            {
                name: "collection.zip",
                id: 2,
                child: [
                    {
                        name: "collection (same name of collection.zip)",
                        id: 5,
                        child: [
                            {
                                name: "2022", id: 6, child: [
                                    {
                                        name: "09 SEP", id: 7, child: [
                                            {
                                                name: "30", id: 8, child: [
                                                    {
                                                        name: "ZPEC-3-SFNY-200.html", id: 9, child: []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                        ],
                    }
                ],
            },
        ],
    };

    //create Collapse button data
    const [collapseAll, setCollapseAll] = useState(false);
    const handleCollapseAll = (value) => setCollapseAll(value);

    //Create file action data*
    const handleFileOnClick = (file) => {
        console.log(file);
    };

    const action = {
        fileOnClick: handleFileOnClick,
    };

    //Create Decoration data*
    const treeDecorator = {
        showIcon: true,
        iconSize: 18,
        textSize: 15,
        showCollapseAll: true,
    };

    return (
        <div>
            <FileTree
                data={data}
                action={action} //optional
                isCollapseAll={true}
                collapseAll={{collapseAll, handleCollapseAll}} //Optional
                decorator={treeDecorator} //Optional
            />
        </div>
    );
}

export default TreeFileView