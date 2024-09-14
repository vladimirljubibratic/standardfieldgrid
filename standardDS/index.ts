/* eslint-disable no-var */
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class standardDS implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: HTMLDivElement;
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        // Add control initialization code
        this._container = container;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        this._container.innerHTML = "";
        var table = document.createElement("table");
        var tr = document.createElement("tr");
        
        var collumns = ["Title", "Description", "Date"];
        
        for (let index = 0; index < collumns.length; index++) {
            const element = collumns[index];
            var th = document.createElement("th");
            th.appendChild(document.createTextNode(element));
            tr.appendChild(th);
        }
        
        table.appendChild(tr);
               
        async function populateData (ID: string) {
            //var result = [];
            try {
                const query = `?$select=vlj_title,vlj_description,vlj_date&$filter=vlj_idaccount eq ${idAccount}`;
                const records = await context.webAPI.retrieveMultipleRecords("vlj_vticket", query);
                
                if (records.entities.length > 0) {
                    for (let i = 0; i < records.entities.length; i++) {
                        var tr = document.createElement("tr");
                        var tc1 = document.createElement("td");
                        var tc2 = document.createElement("td");
                        var tc3 = document.createElement("td");
                        tc1.appendChild(document.createTextNode(records.entities[i].vlj_title));
                        tr.appendChild(tc1);
                        tc2.appendChild(document.createTextNode(records.entities[i].vlj_description));
                        tr.appendChild(tc2);
                        tc3.appendChild(document.createTextNode(records.entities[i].vlj_date));
                        tr.appendChild(tc3);
                        table.appendChild(tr);
                    }
                } else {
                    var tr = document.createElement("tr");
                    var tc = document.createElement("td");
                    tc.colSpan = 3;
                    tc.appendChild(document.createTextNode("No records found"));
                    tr.appendChild(tc);
                    table.appendChild(tr);
                }   
                
            } catch (error: unknown) {
                console.log((error as Error).message);
            }
            
            //return records as unknown as any[];    
        }
        console.log("Populate data");
        const idAccount = context.parameters.idProperty.raw || "";      
        populateData(idAccount);     
        this._container.appendChild(table); 
        

    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
