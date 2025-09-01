import { useState } from "react";
import "./App.css";
import "./components/IconPanel";
import IconPanel from "./components/IconPanel";
import Item from "./models/Item";
import * as ImagesJSON from "./images.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function App() {
  // Allocate space for all the items
  const workaround = ImagesJSON;
  const events = new Array<Item>(Object.keys(workaround.events).length);
  const foci = new Array<Item>(Object.keys(workaround.goals).length);
  const ideas = new Array<Item>(Object.keys(workaround.ideas).length);
  const ministers = new Array<Item>(Object.keys(workaround.ministers).length);
  const texticons = new Array<Item>(Object.keys(workaround.texticons).length);
  const news_events = new Array<Item>(
    Object.keys(workaround.news_events).length
  );
  const decision_icons = new Array<Item>(
    Object.keys(workaround.decision_icons).length
  );
  const decision_image = new Array<Item>(
    Object.keys(workaround.decision_image).length
  );

  // Load the JSON file into Item objects
  let itemArray = new Array<Array<Item>>(
    events,
    foci,
    ideas,
    ministers,
    texticons,
    news_events,
    decision_icons,
    decision_image
  );
  let upperKeyArray = new Array<string>(
    "events",
    "goals",
    "ideas",
    "ministers",
    "texticons",
    "news_events",
    "decision_icons",
    "decision_image"
  );
  let lowerKeyArray = new Array<string[]>(
    Object.keys(workaround.events),
    Object.keys(workaround.goals),
    Object.keys(workaround.ideas),
    Object.keys(workaround.ministers),
    Object.keys(workaround.texticons),
    Object.keys(workaround.news_events),
    Object.keys(workaround.decision_icons),
    Object.keys(workaround.decision_image)
  );
  for (let i = 0; i < itemArray.length; i++) {
    let upperKey: string = upperKeyArray[i];
    for (let o = 0; o < itemArray[i].length; o++) {
      let lowerKey = lowerKeyArray[i][o];
      itemArray[i][o] = new Item(
        // @ts-ignore
        workaround[upperKey][lowerKey].filepath,
        // @ts-ignore
        workaround[upperKey][lowerKey].gfx_name,
        // @ts-ignore
        workaround[upperKey][lowerKey].gfx_name.toUpperCase()
      );
    }
  }

  // Create Props
  const [eventProps, setEventProps] = useState(events);
  const [fociProps, setFociProps] = useState(foci);
  const [ideaProps, setIdeaProps] = useState(ideas);
  const [ministerProps, setMinisterProps] = useState(ministers);
  const [texticonProps, setTexticonProps] = useState(texticons);
  const [newsEventProps, setNewsEventProps] = useState(news_events);
  const [decisionIconProps, setDecisionIconProps] = useState(decision_icons);
  const [decisionImageProps, setDecisionImageProps] = useState(decision_image);

  function filterItems(e: React.KeyboardEvent<HTMLInputElement>) {
    // Makes items filtered version of allItems
    if (e.key === "Enter") {
      setEventProps(
        events.filter((item) =>
          item.id.includes(e.currentTarget.value.trim().toUpperCase())
        )
      );
      setFociProps(
        foci.filter((item) =>
          item.id.includes(e.currentTarget.value.trim().toUpperCase())
        )
      );
      setIdeaProps(
        ideas.filter((item) =>
          item.id.includes(e.currentTarget.value.trim().toUpperCase())
        )
      );
      setMinisterProps(
        ministers.filter((item) =>
          item.id.includes(e.currentTarget.value.trim().toUpperCase())
        )
      );
      setTexticonProps(
        texticons.filter((item) =>
          item.id.includes(e.currentTarget.value.trim().toUpperCase())
        )
      );
      setNewsEventProps(
        news_events.filter((item) =>
          item.id.includes(e.currentTarget.value.trim().toUpperCase())
        )
      );
      setDecisionIconProps(
        decision_icons.filter((item) =>
          item.id.includes(e.currentTarget.value.trim().toUpperCase())
        )
      );
      setDecisionImageProps(
        decision_image.filter((item) =>
          item.id.includes(e.currentTarget.value.trim().toUpperCase())
        )
      );
    }
  }

  return (
    <>
      <header>
        <h1 className="title">
          TNO GFX SEARCH
        </h1>
        <div className="w-75 mx-auto overflow-hidden" style={{height: '50px'}}>
          <input
            type="text"
            placeholder="Search"
            id = "searchBar"
            className="searchBar w-100 px-5 mx-auto font-med regBorder"
            onKeyUp={(e) => filterItems(e)}
          >
          </input>
            <FontAwesomeIcon 
              className="mx-3"
              style={{ position: 'relative', bottom: '2.5rem'}}
              icon={faMagnifyingGlass}
              size="lg"
            />
        </div>
      </header>

      <div className="w-75 mx-auto border-bottom border-dark my-3"></div>

      <IconPanel items={eventProps} heading="Events" />
      <IconPanel items={fociProps} heading="National Foci" />
      <IconPanel items={ideaProps} heading="National Ideas" />
      <IconPanel items={ministerProps} heading="Ministers" />
      <IconPanel items={texticonProps} heading="Texticons" />
      <IconPanel items={newsEventProps} heading="News Events" />
      <IconPanel items={decisionIconProps} heading="Decision Icons" />
      <IconPanel items={decisionImageProps} heading="Decision Images" />

      <footer className="w-75">
        <p className="footer-text">
          Made by <a href="https://x.com/story_falling">fallingStory</a> using{" "}
          <a href="https://create-react-app.dev/">Create React App</a>,{" "}
          <a href="https://github.com/gitname/react-gh-pages">react-gh-pages</a>
          , and <a href="https://www.freecodecamp.org/">freeCodeCamp</a>.
        </p>
        <p>
          Based off of{" "}
          <a href="https://yard1.github.io/HoI4-GFX-Search/">
            Yard1's HOI4 GFX Search
          </a>
        </p>
        <p>Last updated 08-31-2024</p>
      </footer>
    </>
  );
}

export default App;
