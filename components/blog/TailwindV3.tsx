//https://github.com/tailwindlabs/tailwindcss/releases

import React, { Component } from 'react';

class TailwindV3News extends Component {

  state = {
    shadowBoxColored: false,
    aspectRatio: "auto",
    column: 1,
    break: "",
    indent: "6"
  }

  indentValues = ["6", "12", "[50%]"]



  componentDidMount() {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=412570
    const radioBtnAuto = document.getElementById("radio-auto") as HTMLInputElement;
    if (radioBtnAuto != null) {
      radioBtnAuto.checked = true;
    }
  }


  onChangeShadowColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ shadowBoxColored: event.target.checked }, () => {
    });
  };

  onChangeAspectRatio = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ aspectRatio: event.target.value }, () => {
    });
  };


  onChangeColumn = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    this.setState({ column: event.target.value }, () => {
    });
  };

  onChangeBreak = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ break: event.target.value }, () => {
    });
  };

  onChangeIndent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("new value "+event.target.value)
    this.setState({ indent: event.target.value }, () => {
    });
  };

  //https://www.akashmittal.com/for-loop-inside-react-jsx/
  returnValueOptionsForSelectInput = () => {
    const row = [];
    for (var i = 1; i <= 8; i++) {
      //set default vlaue checked
      row.push(<option key={i} value={i}>{i}</option>);
    }
    return row;
  };

  render() {

    return (
      <div>
        {/* shadow box */}
        <div className="flex flex-col">
          <div>shadow-box</div>

          <div className="flex flex-row space-x-4 tailwind-text">

            <div>shadow-xl</div>

            <div className={`${this.state.shadowBoxColored ? "opacity-100" : "opacity-70 text-gray-500"} `}>
              shadow-red-800
            </div>
          </div>
          <input type="checkbox" onChange={this.onChangeShadowColor}></input>


          <div className={
            `text-center w-1/2 shadow-xl p-5 
    ${this.state.shadowBoxColored ? "shadow-red-800" : ""}
    `}>
            shadow box
          </div>



        </div>



        {/* aspect ratio */}
        <div className="flex flex-col">
          <fieldset>
            <legend>aspect-ratio</legend>

            <div className="flex flex-row space-x-4 tailwind-text">

              <div className={`${this.state.aspectRatio == "auto" ? "opacity-100" : "opacity-70 text-gray-500"} `}>
                aspect-auto
              </div>
              <div className={`${this.state.aspectRatio == "square" ? "opacity-100" : "opacity-70 text-gray-500"} `}>
                aspect-square
              </div>
              <div className={`${this.state.aspectRatio == "video" ? "opacity-100" : "opacity-70 text-gray-500"} `}>
                aspect-video
              </div>
            </div>


            <div className='flex flex-row space-x-4'>
              <p>
                <input
                  type="radio"
                  name="aspec-ratio"
                  value="auto"
                  id="radio-auto"

                  defaultChecked
                  onChange={this.onChangeAspectRatio}
                />
                <label htmlFor="auto">auto</label>
              </p>

              <p>
                <input
                  type="radio"
                  name="aspec-ratio"
                  value="square"
                  id="radio-square"
                  onChange={this.onChangeAspectRatio}
                />
                <label htmlFor="square">square</label>
              </p>

              <p>
                <input
                  type="radio"
                  name="aspec-ratio"
                  value="video"
                  id="radio-video"
                  onChange={this.onChangeAspectRatio}
                />
                <label htmlFor="video">video</label>
              </p>
            </div>
          </fieldset>

          <img className={`bg-red-400 w-1/2  aspect-${this.state.aspectRatio}`} src="https://i.pinimg.com/564x/ae/da/ae/aedaae9dba4127d410facbce8fcd3f6c.jpg"></img>

        </div>

        {/* columns */}
        <div className="flex flex-col">

          <label htmlFor="column-select">how many columns</label>

          <select name="column-select" id="column-select" onChange={this.onChangeColumn}>
            {this.returnValueOptionsForSelectInput()}
          </select>

          <div className="tailwind-text">
            column-{this.state.column}
          </div>

          <div className={`columns-${this.state.column}`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>

        {/* break*/}
        <div className="flex flex-col">
          <div>break</div>

          <div className="flex flex-row space-x-4 tailwind-text">
            p-4 rounded {this.state.break}
          </div>

          <div className="columns-2 space-y-2">
            <blockquote className={`p-4 rounded bg-white border-2 border-gray-300 ${this.state.break != "" ? `${this.state.break}` : ""}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</blockquote>
            <blockquote className={`p-4 rounded bg-white border-2 border-gray-300  ${this.state.break != "" ? `${this.state.break}` : ""}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</blockquote>
            <blockquote className={`p-4 rounded bg-white border-2 border-gray-300  ${this.state.break != "" ? `${this.state.break}` : ""}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</blockquote>
            <blockquote className={`p-4 rounded bg-white border-2 border-gray-300  ${this.state.break != "" ? `${this.state.break}` : ""}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</blockquote>
            <blockquote className={`p-4 rounded bg-white border-2 border-gray-300  ${this.state.break != "" ? `${this.state.break}` : ""}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</blockquote>
          </div>



          <div className='flex flex-row space-x-4'>

            <p>
              <input
                type="radio"
                name="break"
                value=""
                id="radio-nothing"

                defaultChecked
                onChange={this.onChangeBreak}
              />
              <label htmlFor="noting">nothing</label>
            </p>

            <p>
              <input
                type="radio"
                name="break"
                value="break-before-column"
                id="radio-break-before-auto"
                onChange={this.onChangeBreak}
              />
              <label htmlFor="break-before-column">break-before-column</label>
            </p>

            <p>
              <input
                type="radio"
                name="break"
                value="break-inside-avoid-column"
                id="radio-break-inside-avoid-column"
                onChange={this.onChangeBreak}
              />
              <label htmlFor="break-inside-avoid-column">break-inside-avoid-column</label>
            </p>

            <p>
              <input
                type="radio"
                name="break"
                value="after"
                id="radio-after"
                onChange={this.onChangeBreak}
              />
              <label htmlFor="after">after</label>
            </p>
          </div>
        </div>

        {/* indent*/}
        <div className="flex flex-col">
          <div>indent</div>

          <select name="indent-select" id="indent-select" onChange={this.onChangeIndent}>
            {
            this.indentValues.map(value => {
              console.log(value)
               return <option key={value} value={value} className='bg-red-100'>{value}</option>;
            })
            }
          </select>
          <div className={`indent-${this.state.indent}`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
    )
  }

}

export default TailwindV3News