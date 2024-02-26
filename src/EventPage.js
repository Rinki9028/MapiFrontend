import React from "react";
import { useParams } from "react-router-dom";

function EventPage() {
  const { event } = useParams(); // Get the event name from the URL

  // Define content specific to each event
  let eventContent;

  switch (event) {
    case "wedding":
      eventContent = (
        <>
          <h1>Wedding Event</h1>
          <p>This is content for the Wedding event.</p>
          {/* Add more content specific to the Wedding event */}
        </>
      );
      break;
    case "corporate":
      eventContent = (
        <>
          <h1>Corporate Event</h1>
          <p>This is content for the Corporate event.</p>
          {/* Add more content specific to the Corporate event */}
        </>
      );
      break;
    case "birthdayparty":
      eventContent = (
        <>
          <h1>Birthday Party Event</h1>
          <p>This is content for the Birthday Party event.</p>
          {/* Add more content specific to the Birthday Party event */}
        </>
      );
      break;
    // Add cases for other events as needed
    default:
      // Handle cases where the event doesn't match any known event
      eventContent = (
        <>
          <h1>Event Not Found</h1>
          <p>The selected event is not found.</p>
        </>
      );
  }

  return (
    <div>
       <h1>Event Not Found</h1>
          <p>The selected event is not found.</p>
      {eventContent}
    </div>
  );
}

export default EventPage;
