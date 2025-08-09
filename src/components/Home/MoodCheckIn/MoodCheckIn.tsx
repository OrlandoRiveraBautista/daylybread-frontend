import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonChip,
  IonIcon,
} from "@ionic/react";
import { heart, share, chatbubble, bookmark } from "ionicons/icons";

/* Styles */
import "./MoodCheckIn.scss";

interface MoodOption {
  emoji: string;
  label: string;
  tag: string;
  color: string;
}

interface VerseResponse {
  verse: string;
  reference: string;
  reflection: string;
}

interface MoodData {
  [key: string]: VerseResponse[];
}

const MoodCheckIn: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentResponse, setCurrentResponse] = useState<VerseResponse | null>(
    null
  );

  const moodOptions: MoodOption[] = [
    { emoji: "😇", label: "Peaceful", tag: "peaceful", color: "success" },
    { emoji: "🙏", label: "Grateful", tag: "grateful", color: "primary" },
    { emoji: "😞", label: "Downcast", tag: "downcast", color: "medium" },
    { emoji: "😤", label: "Frustrated", tag: "frustrated", color: "warning" },
    { emoji: "💭", label: "Anxious", tag: "anxious", color: "tertiary" },
    { emoji: "❤️", label: "Loved", tag: "loved", color: "secondary" },
    { emoji: "😔", label: "Guilty", tag: "guilty", color: "dark" },
    { emoji: "🌱", label: "Hopeful", tag: "hopeful", color: "success" },
  ];

  const moodData: MoodData = {
    peaceful: [
      {
        verse:
          "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
        reference: "John 14:27",
        reflection:
          "God's peace surpasses all understanding. Rest in His presence today.",
      },
      {
        verse:
          "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
        reference: "Isaiah 26:3",
        reflection: "Trust anchors the soul in God's unshakeable peace.",
      },
      {
        verse:
          "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        reference: "Philippians 4:7",
        reflection:
          "Let God's peace be your guardian today, protecting your heart and mind.",
      },
    ],
    grateful: [
      {
        verse:
          "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
        reference: "1 Thessalonians 5:16-18",
        reflection:
          "Gratitude transforms ordinary moments into extraordinary blessings.",
      },
      {
        verse:
          "Give thanks to the Lord, for he is good; his love endures forever.",
        reference: "Psalm 107:1",
        reflection:
          "Your grateful heart reflects God's goodness back to the world.",
      },
      {
        verse:
          "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
        reference: "Psalm 100:4",
        reflection: "Thanksgiving opens the door to deeper intimacy with God.",
      },
    ],
    downcast: [
      {
        verse:
          "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.",
        reference: "Psalm 42:11",
        reflection:
          "Even in darkness, hope anchors your soul. God sees and cares for you.",
      },
      {
        verse:
          "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
        reference: "Psalm 34:18",
        reflection:
          "In your lowest moments, God draws nearest. You are not alone.",
      },
      {
        verse:
          "Weeping may stay for the night, but rejoicing comes in the morning.",
        reference: "Psalm 30:5",
        reflection: "This season of sorrow is temporary. Joy will dawn again.",
      },
    ],
    frustrated: [
      {
        verse:
          "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry.",
        reference: "James 1:19",
        reflection:
          "Pause and breathe. God's wisdom brings clarity to chaotic moments.",
      },
      {
        verse:
          "In your anger do not sin: Do not let the sun go down while you are still angry.",
        reference: "Ephesians 4:26",
        reflection:
          "Release today's frustrations to God. Don't carry them into tomorrow.",
      },
      {
        verse:
          "A gentle answer turns away wrath, but a harsh word stirs up anger.",
        reference: "Proverbs 15:1",
        reflection:
          "Choose gentleness today. It has the power to transform hearts.",
      },
    ],
    anxious: [
      {
        verse: "Cast all your anxiety on him because he cares for you.",
        reference: "1 Peter 5:7",
        reflection:
          "God sees your anxious heart today. Let Him carry what troubles you.",
      },
      {
        verse:
          "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        reference: "Philippians 4:6",
        reflection:
          "Transform your worries into prayers. God hears every concern.",
      },
      {
        verse:
          "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
        reference: "Matthew 6:34",
        reflection:
          "Focus on today's grace. Tomorrow is in God's capable hands.",
      },
    ],
    loved: [
      {
        verse:
          "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
        reference: "Romans 8:38-39",
        reflection:
          "Nothing can diminish God's love for you. You are eternally cherished.",
      },
      {
        verse:
          "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
        reference: "1 John 3:1",
        reflection:
          "You are God's beloved child. His love for you knows no bounds.",
      },
      {
        verse:
          "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
        reference: "Romans 5:8",
        reflection:
          "God's love isn't based on your performance. It's pure, unconditional grace.",
      },
    ],
    guilty: [
      {
        verse:
          "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
        reference: "1 John 1:9",
        reflection:
          "God's forgiveness is complete and immediate. You are clean before Him.",
      },
      {
        verse:
          "Therefore, there is now no condemnation for those who are in Christ Jesus.",
        reference: "Romans 8:1",
        reflection: "Guilt has no power over you. Christ has set you free.",
      },
      {
        verse:
          "As far as the east is from the west, so far has he removed our transgressions from us.",
        reference: "Psalm 103:12",
        reflection:
          "Your past doesn't define you. God has removed it completely.",
      },
    ],
    hopeful: [
      {
        verse:
          "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
        reference: "Romans 15:13",
        reflection:
          "Hope is rising in your heart. God is writing a beautiful story.",
      },
      {
        verse:
          'For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future.',
        reference: "Jeremiah 29:11",
        reflection:
          "Your future is bright in God's hands. He has good plans for you.",
      },
      {
        verse:
          "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        reference: "Isaiah 40:31",
        reflection:
          "Hope in God renews everything. Your strength is being restored.",
      },
    ],
  };

  const handleMoodSelect = (mood: MoodOption) => {
    setSelectedMood(mood.tag);
    const responses = moodData[mood.tag];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    setCurrentResponse(randomResponse);
  };

  const handleNewCheckIn = () => {
    setSelectedMood(null);
    setCurrentResponse(null);
  };

  const handleSaveVerse = () => {
    // TODO: Implement save functionality
    console.log("Saving verse to bookmarks...");
  };

  const handleShareVerse = () => {
    // TODO: Implement share functionality
    if (currentResponse && navigator.share) {
      navigator.share({
        title: "Daily Scripture",
        text: `"${currentResponse.verse}" - ${currentResponse.reference}\n\n${currentResponse.reflection}`,
      });
    }
  };

  const handleTalkToGod = () => {
    // TODO: Navigate to AI chat/prayer feature
    console.log("Opening prayer chat...");
  };

  if (!selectedMood || !currentResponse) {
    return (
      <IonGrid className="mood-checkin-grid">
        <IonRow>
          <IonCol size="12">
            <IonCard className="mood-checkin-card">
              <IonCardContent>
                <div className="mood-checkin-header">
                  <IonText>
                    <h2>🤔 How are you feeling today?</h2>
                    <p>Let God's Word speak to your heart</p>
                  </IonText>
                </div>

                <div className="mood-options">
                  {moodOptions.map((mood, index) => (
                    <IonChip
                      key={index}
                      className="mood-chip"
                      color={mood.color}
                      onClick={() => handleMoodSelect(mood)}
                    >
                      <span className="mood-emoji">{mood.emoji}</span>
                      <span className="mood-label">{mood.label}</span>
                    </IonChip>
                  ))}
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }

  return (
    <IonGrid className="mood-checkin-grid">
      <IonRow>
        <IonCol size="12">
          <IonCard className="mood-response-card">
            <IonCardContent>
              <div className="response-header">
                <IonText>
                  <h3>A word for your heart today</h3>
                </IonText>
                <IonButton
                  fill="clear"
                  size="small"
                  onClick={handleNewCheckIn}
                  className="new-checkin-btn"
                >
                  Check in again
                </IonButton>
              </div>

              <div className="verse-content">
                <IonText>
                  <p className="verse-text">"{currentResponse.verse}"</p>
                  <p className="verse-reference">
                    — {currentResponse.reference}
                  </p>
                </IonText>
              </div>

              <div className="reflection-content">
                <IonText>
                  <p className="reflection-text">
                    {currentResponse.reflection}
                  </p>
                </IonText>
              </div>

              <div className="action-buttons">
                <IonButton
                  fill="outline"
                  size="small"
                  onClick={handleSaveVerse}
                  className="action-btn"
                >
                  <IonIcon icon={bookmark} slot="start" />
                  Save
                </IonButton>
                <IonButton
                  fill="outline"
                  size="small"
                  onClick={handleShareVerse}
                  className="action-btn"
                >
                  <IonIcon icon={share} slot="start" />
                  Share
                </IonButton>
                <IonButton
                  fill="solid"
                  size="small"
                  color="primary"
                  onClick={handleTalkToGod}
                  className="action-btn talk-btn"
                >
                  <IonIcon icon={chatbubble} slot="start" />
                  Talk to God
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default MoodCheckIn;
