import Toolbar from "react-big-calendar/lib/Toolbar";
import { ChevronLeft, ChevronRight } from "react-feather";

export class CustomToolbar extends Toolbar {
  render() {
    const date = new Date(this.props.date);
    const year = date.getFullYear();
    const btnArrow = { border: "none" };

    return (
      <div className="rbc-toolbar">
        <div className="rbc-btn-group">
          <button
            type="button"
            onClick={() => this.navigate("PREV")}
            style={btnArrow}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => this.navigate("NEXT")}
            style={btnArrow}
          >
            <ChevronRight />
          </button>
          <span className="rbc-toolbar-label">
            {this.props.label}, {year}
          </span>
        </div>
        <div className="rbc-btn-group">
          <button
            type="button"
            onClick={() => this.navigate("TODAY")}
            style={btnArrow}
          >
            today
          </button>
          <button
            type="button"
            onClick={this.view.bind(null, "day")}
            style={btnArrow}
          >
            day
          </button>
          <button
            type="button"
            onClick={this.view.bind(null, "week")}
            style={btnArrow}
          >
            week
          </button>
        </div>
      </div>
    );
  }

  navigate = (action) => {
    console.log(action);

    this.props.onNavigate(action);
  };
}
