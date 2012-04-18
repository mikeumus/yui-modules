YAHOO.env.classMap = {"Paginator.ui.LastPageLink": "gallery-paginator", "NodeList": "gallery-nodelist-extras2", "ComplexMath": "gallery-complexnumber", "Accordion": "gallery-accordion-horiz-vert", "MathFunction.InverseHyperbolicCosine": "gallery-mathcanvas", "Node~scrollIntoView": "node", "Plugin.BusyOverlay": "gallery-busyoverlay", "YUI": "gallery-funcprog", "SelectAllCheckboxGroup": "gallery-checkboxgroups", "Math": "gallery-math", "Paginator.ui.CurrentPageInput": "gallery-paginator", "MathFunction.InverseHyperbolicTangent": "gallery-mathcanvas", "Object": "gallery-object-extras", "MathFunction.Value": "gallery-mathcanvas", "MathFunction.FunctionWithArgs": "gallery-mathcanvas", "LinkedListIterator": "gallery-linkedlist", "MathFunction.Negate": "gallery-mathcanvas", "MathFunction.I": "gallery-mathcanvas", "MathFunction.HyperbolicTangent": "gallery-mathcanvas", "MathFunction.E": "gallery-mathcanvas", "Paginator.ui.FirstPageLink": "gallery-paginator", "AtLeastOneCheckboxGroup": "gallery-checkboxgroups", "MathFunction.Tangent": "gallery-mathcanvas", "MathFunction.Conjugate": "gallery-mathcanvas", "MathFunction": "gallery-mathcanvas", "Plugin.DataTableState": "gallery-datatable-state", "TreebleDataSource": "gallery-treeble", "MathFunction.Arcsine": "gallery-mathcanvas", "ArrayList": "gallery-algorithms", "MathFunction.Product": "gallery-mathcanvas", "MathFunction.Max": "gallery-mathcanvas", "Paginator.ui.CurrentPageReport": "gallery-paginator", "MathFunction.Min": "gallery-mathcanvas", "Iterable": "gallery-iterable-extras", "Paginator.ui.ValidationPageLinks": "gallery-paginator", "BulkEditDataSource": "gallery-bulkedit", "MathFunction.Cosine": "gallery-mathcanvas", "MathFunction.Variable": "gallery-mathcanvas", "LinkedListItem": "gallery-linkedlist", "EnableIfAnyCheckboxGroup": "gallery-checkboxgroups", "Node~dimensions": "node", "CheckboxGroup": "gallery-checkboxgroups", "MathFunction.InverseHyperbolicSine": "gallery-mathcanvas", "MathFunction.Sum": "gallery-mathcanvas", "MathFunction.Quotient": "gallery-mathcanvas", "MathFunction.Arctangent2": "gallery-mathcanvas", "Plugin.ConsoleTest": "gallery-console-test", "Chipper": "gallery-chipper", "Treeble": "gallery-treeble", "MathFunction.NaturalLog": "gallery-mathcanvas", "Plugin.FixedSizeAccordion": "gallery-accordion-horiz-vert", "Paginator.ui.ItemRangeDropdown": "gallery-paginator", "ExpirationCache": "gallery-expiration-cache", "MathFunction.SquareRoot": "gallery-mathcanvas", "MathFunction.ImaginaryPart": "gallery-mathcanvas", "Paginator": "gallery-paginator", "io~multiresponse": "io", "MathFunction.Pi": "gallery-mathcanvas", "MathCanvas": "gallery-mathcanvas", "MathFunction.Logarithm": "gallery-mathcanvas", "MathFunction.Arctangent": "gallery-mathcanvas", "FormManager": "gallery-formmgr-css-validation", "MRUCache": "gallery-mru-cache", "MathFunction.HyperbolicSine": "gallery-mathcanvas", "MathFunction.Magnitude": "gallery-mathcanvas", "BulkEditor": "gallery-bulkedit", "HTMLTableBulkEditor": "gallery-bulkedit", "MathFunction.Arccosine": "gallery-mathcanvas", "MathCanvas.RectList": "gallery-mathcanvas", "Canvas.Context2d": "gallery-canvas", "PageLayout": "gallery-layout", "MathFunction.RealPart": "gallery-mathcanvas", "Plugin.DataTableRowExpansion": "gallery-datatable-row-expansion", "Paginator.ui.PreviousPageLink": "gallery-paginator", "QueryBuilder": "gallery-querybuilder", "Paginator.ui.PageLinks": "gallery-paginator", "Paginator.ui.NextPageLink": "gallery-paginator", "Node~optimizations": "node", "LinkedList": "gallery-linkedlist", "AsyncFunctionDataSource": "gallery-datasource-async-function", "MathFunction.Sine": "gallery-mathcanvas", "MathCanvas.Parser": "gallery-mathcanvas", "MathFunction.Phase": "gallery-mathcanvas", "ComplexNumber": "gallery-complexnumber", "Paginator.ui.RowsPerPageDropdown": "gallery-paginator", "Assert": "gallery-test-extras", "MathFunction.Rotate": "gallery-mathcanvas", "MultiObject": "gallery-multiobject", "MathFunction.Exponential": "gallery-mathcanvas", "ExpressionBuilder": "gallery-exprbuilder", "InstanceManager": "gallery-instancemanager", "Plugin.Neon": "gallery-neon", "MathFunction.HyperbolicCosine": "gallery-mathcanvas", "Plugin.OverlayForm": "gallery-formmgr-overlay-plugin", "Plugin.PageLayoutDataTableModule": "gallery-layout-datatable", "Plugin.DataTableQuickEdit": "gallery-quickedit", "QueryBuilder.Select": "gallery-querybuilder", "Array": "gallery-object-extras", "AtMostOneCheckboxGroup": "gallery-checkboxgroups", "QueryBuilder.String": "gallery-querybuilder"};

YAHOO.env.resolveClass = function(className) {
    var a=className.split('.'), ns=YAHOO.env.classMap;

    for (var i=0; i<a.length; i=i+1) {
        if (ns[a[i]]) {
            ns = ns[a[i]];
        } else {
            return null;
        }
    }

    return ns;
};
