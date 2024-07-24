import { useState } from "react";
import "./App.css";
import "./components/IconPanel";
import IconPanel from "./components/IconPanel";
import Item from "./models/Item";
import * as ImagesJSON from "./images.json";

function App() {
  // Allocate space for all the items
  const workaround = ImagesJSON;
  const events = new Array<Item>(Object.keys(workaround.events).length);
  const foci = new Array<Item>(Object.keys(workaround.foci).length);
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
    "foci",
    "ideas",
    "ministers",
    "texticons",
    "news_events",
    "decision_icons",
    "decision_image"
  );
  let lowerKeyArray = new Array<string[]>(
    Object.keys(workaround.events),
    Object.keys(workaround.foci),
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
        workaround[upperKey][lowerKey].path,
        // @ts-ignore
        workaround[upperKey][lowerKey].gfx,
        // @ts-ignore
        workaround[upperKey][lowerKey].gfx.toUpperCase()
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
        <h1 className="font-big" id="title">
          TNO GFX Search
        </h1>
        <input
          type="text"
          placeholder="Search"
          id="searchBar"
          className="font-med"
          onKeyUp={(e) => filterItems(e)}
        ></input>
      </header>
      <IconPanel items={eventProps} heading="Events" />
      <IconPanel items={fociProps} heading="National Foci" />
      <IconPanel items={ideaProps} heading="National Ideas" />
      <IconPanel items={ministerProps} heading="Ministers" />
      <IconPanel items={texticonProps} heading="Texticons" />
      <IconPanel items={newsEventProps} heading="News Events" />
      <IconPanel items={decisionIconProps} heading="Decision Icons" />
      <IconPanel items={decisionImageProps} heading="Decision Images" />
      <footer>
        <h3 id="footer-text">Some footer text</h3>
      </footer>
    </>
  );
}

export default App;
