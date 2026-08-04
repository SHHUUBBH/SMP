import "./PageToolbar.css";

export default function PageToolbar({
    left,
    right,
}) {

    return (

        <div className="page-toolbar">

            <div className="toolbar-left">

                {left}

            </div>

            <div className="toolbar-right">

                {right}

            </div>

        </div>

    );

}