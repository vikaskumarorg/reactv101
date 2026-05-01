import { useEffect, useMemo, useState } from 'react';
import './App.css';

const API_URL = 'https://engagifii-support-billtracking.azurewebsites.net/api/1.0/legislative/public-bills/calendar-lite';
const AUTH_TOKEN = process.env.REACT_APP_BILLTRACKING_API_TOKEN ||
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjczQ0Q4NERGRUJGQzk4NUU4RUZGOTU0QjY2NTg0OEFBMTYzNDExNkIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJjODJFMy12OG1GNk9fNVZMWmxoSXFoWTBFV3MifQ.eyJuYmYiOjE3Nzc2MzI1NjMsImV4cCI6MTgwOTE2ODU2MywiaXNzIjoiaHR0cHM6Ly9lbmdhZ2lmaWktc3VwcG9ydC1pZGVudGl0eS5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJodHRwczovL2VuZ2FnaWZpaS1zdXBwb3J0LWlkZW50aXR5LmF6dXJld2Vic2l0ZXMubmV0L3Jlc291cmNlcyIsIlVzZXJzQVBJIiwiQWNjcmVkaXRhdGlvbkFQSSIsIkJpbGx0cmFja2luZ0FwaSIsIkNvbW1lbnRBcGkiLCJOb3Rlc0FwaSJdLCJjbGllbnRfaWQiOiJuZy5FbmdhZ2lmaWlVSSIsInN1YiI6IjcxOWU4MDk4LTk4NGEtNDkwZi04YjVhLTNjOTE5NGQ5Njc4ZiIsImF1dGhfdGltZSI6MTc3NzYzMjU2MiwiaWRwIjoibG9jYWwiLCJzcy1waWQiOiIiLCJwaWN0dXJlIjoiIiwicGljdHVyZS1zbWFsbCI6IiIsInBpY3R1cmUtaWNvbiI6IiIsImdpdmVuX25hbWUiOiJFbmdhZ2lmaWkiLCJmYW1pbHlfbmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBjcmVzY2VyYW5jZS5jb20iLCJsYXN0LWxvZ2luIjoiNS8xLzIwMjYgOToxMjoyNSBBTSIsImN1cnJlbnQtbG9naW4iOiI1LzEvMjAyNiAxMDo0OToyMiBBTSIsInBfdHlwZSI6Im51bGwiLCJyZWRpcmVjdF9lbmFibGVkIjoiIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwiVXNlcnNBUEkiLCJBY2NyZWRpdGF0aW9uQVBJIiwiQmlsbHRyYWNraW5nQXBpIiwiQ29tbWVudEFwaSIsIk5vdGVzQXBpIl0sImFtciI6WyJwd2QiXX0.YsWyYbuzx-dg-VykDhUvEGxfaQD8gnYwd7NAhV4Ipe1GodtYboHlhuGs7k3-VfroQriRQci4oypsOcGkD1bMnkYx-d9-SDvEH9OCuIWjhyMl66k2HqaLmMN6IxLchHntsbmQmVLzYLHkwFq9C7qGwIE36CHEVT7HY9Bvs0QbIhV2we0Bf5C45qVVUXnPF6qw930eElPlGKm1OwG4RMgkE7K_RJ3xYdp-4sJF9Uh_vKM8p-mwzxPGynxbOGLDDb-EkKzyaSiQPug8ejF390L4lc0gCEhJurn0wYk1b6aTbdzJQ2GxYIZPtuDl1fVEHRD-SH_engudEj3bEIxQ8QZZUA';

const REQUEST_BODY = {
  sessions: [],
  trackingLevels: [],
  title: '',
  billId: 0,
  startDate: '02/01/2019',
  filterBody: {
    meetingFilterType: 7,
    startDate: '01/16/2026',
    endDate: '01/16/2026'
  },
  myBills: [],
  billTypeLink: []
};

const chamberColors = {
  Senate: '#2D76B9',
  House: '#D73934',
  Joint: '#8F3E9F'
};

function MeetingsByAPI() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'tenant-code': 'accg'
      },
      body: JSON.stringify(REQUEST_BODY)
    })
      .then(async response => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`${response.status} ${response.statusText}: ${text}`);
        }
        return response.json();
      })
      .then(data => {
        if (!active) return;
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch(fetchError => {
        if (!active) return;
        setError(fetchError.message || 'Unable to load meetings.');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const aTime = new Date(a.meetingTime || a.start).getTime();
      const bTime = new Date(b.meetingTime || b.start).getTime();
      return aTime - bTime;
    });
  }, [events]);

  const dateLabel = useMemo(() => {
    if (!sortedEvents.length) return '';
    const first = new Date(sortedEvents[0].meetingTime || sortedEvents[0].start);
    return first.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }, [sortedEvents]);

  useEffect(() => {
    const pdf = sortedEvents
      .map(event => extractPdfUrl(event.eventDescription || event.description || ''))
      .find(Boolean);
    setDownloadUrl(pdf || '');
  }, [sortedEvents]);

  function extractPdfUrl(html = '') {
    const match = html.match(/href=["']([^"']+\.pdf[^"']*)["']/i);
    return match ? match[1] : null;
  }

  async function handleDownloadPdf(event) {
    event.preventDefault();
    if (!downloadUrl) return;

    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        window.open(downloadUrl, '_blank');
        return;
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = 'meeting-agenda.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(downloadUrl, '_blank');
    }
  }

  return (
    <div className="meetings-container">
      <div className="meetings-hero">
        <div className="meetings-logo">ACCG</div>
        <div className="meetings-download-banner">
          <span>Click </span>
          {downloadUrl ? (
            <a className="meetings-download-link" href={downloadUrl} onClick={handleDownloadPdf}>
              here
            </a>
          ) : (
            <span className="meetings-download-link disabled">here</span>
          )}
          <span> to download PDF.</span>
        </div>
      </div>

      <div className="meetings-card">
        <h2 className="meetings-title">COMMITTEE MEETINGS</h2>
        {loading && <div className="meetings-state">Loading meeting events…</div>}
        {error && <div className="meetings-state error">{error}</div>}
        {!loading && !error && !sortedEvents.length && (
          <div className="meetings-state">No committee meetings available.</div>
        )}

        {sortedEvents.length > 0 && (
          <>
            <div className="meetings-date">{dateLabel}</div>
            <div className="meeting-list">
              {sortedEvents.map(event => {
                const color = chamberColors[event.chamberType] || '#7d7d7d';
                const meetingTime = event.time || new Date(event.meetingTime || event.start).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                });
                const billLine = event.billNumber ? `${event.billNumber} ${event.title || ''}`.trim() : event.title || '';
                const sponsor = event.sponserDetail || event.sponsors || '';

                return (
                  <div key={event.eventId} className="meeting-item">
                    <div className="meeting-item-header" style={{ backgroundColor: color }}>
                      <div className="meeting-item-left">
                        <div className="meeting-location">{event.location || event.chamberType || 'Unknown'}</div>
                        <div className="meeting-committee">{event.eventTitle || event.committeeName || event.title || 'Meeting'}</div>
                      </div>
                      <div className="meeting-time">{meetingTime}</div>
                    </div>
                    {billLine && <div className="meeting-bill">{billLine}</div>}
                    {sponsor && <div className="meeting-sponsor">{sponsor}</div>}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MeetingsByAPI;
