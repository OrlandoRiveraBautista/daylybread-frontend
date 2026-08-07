import React, { useMemo, useState } from "react";
import { IonText, IonIcon, IonButton } from "@ionic/react";
import { sunnyOutline, share, bookOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useAppContext } from "../../../context/context";
import { getBibleUrl } from "../../../utils/support";
import "./VerseOfTheDay.scss";

interface DailyVerse {
  text: string;
  reference: string;
  book: string;
  chapter: number;
  theme: string;
}

// Curated list of 60 classic verses — rotates by day of year, zero API calls
const DAILY_VERSES: DailyVerse[] = [
  { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16", book: "JHN", chapter: 3, theme: "Hope" },
  { text: "I can do all this through him who gives me strength.", reference: "Philippians 4:13", book: "PHP", chapter: 4, theme: "Strength" },
  { text: "The Lord is my shepherd, I lack nothing.", reference: "Psalm 23:1", book: "PSA", chapter: 23, theme: "Peace" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5", book: "PRO", chapter: 3, theme: "Trust" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9", book: "JOS", chapter: 1, theme: "Courage" },
  { text: "And we know that in all things God works for the good of those who love him.", reference: "Romans 8:28", book: "ROM", chapter: 8, theme: "Faith" },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", reference: "Philippians 4:6", book: "PHP", chapter: 4, theme: "Peace" },
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11", book: "JER", chapter: 29, theme: "Hope" },
  { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", reference: "Isaiah 40:31", book: "ISA", chapter: 40, theme: "Renewal" },
  { text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", reference: "1 Corinthians 13:4", book: "1CO", chapter: 13, theme: "Love" },
  { text: "The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?", reference: "Psalm 27:1", book: "PSA", chapter: 27, theme: "Courage" },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28", book: "MAT", chapter: 11, theme: "Rest" },
  { text: "In the beginning God created the heavens and the earth.", reference: "Genesis 1:1", book: "GEN", chapter: 1, theme: "Creation" },
  { text: "Your word is a lamp for my feet, a light on my path.", reference: "Psalm 119:105", book: "PSA", chapter: 119, theme: "Guidance" },
  { text: "Give thanks to the Lord, for he is good; his love endures forever.", reference: "Psalm 107:1", book: "PSA", chapter: 107, theme: "Gratitude" },
  { text: "Rejoice in the Lord always. I will say it again: Rejoice!", reference: "Philippians 4:4", book: "PHP", chapter: 4, theme: "Joy" },
  { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7", book: "1PE", chapter: 5, theme: "Peace" },
  { text: "Jesus answered, I am the way and the truth and the life.", reference: "John 14:6", book: "JHN", chapter: 14, theme: "Faith" },
  { text: "Create in me a pure heart, O God, and renew a steadfast spirit within me.", reference: "Psalm 51:10", book: "PSA", chapter: 51, theme: "Renewal" },
  { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", reference: "Proverbs 18:10", book: "PRO", chapter: 18, theme: "Protection" },
  { text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", reference: "Matthew 6:33", book: "MAT", chapter: 6, theme: "Faith" },
  { text: "He gives strength to the weary and increases the power of the weak.", reference: "Isaiah 40:29", book: "ISA", chapter: 40, theme: "Strength" },
  { text: "This is the day the Lord has made; we will rejoice and be glad in it.", reference: "Psalm 118:24", book: "PSA", chapter: 118, theme: "Joy" },
  { text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", reference: "Matthew 5:16", book: "MAT", chapter: 5, theme: "Purpose" },
  { text: "Be still, and know that I am God.", reference: "Psalm 46:10", book: "PSA", chapter: 46, theme: "Peace" },
  { text: "The grace of the Lord Jesus Christ be with your spirit.", reference: "Philippians 4:23", book: "PHP", chapter: 4, theme: "Grace" },
  { text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you.", reference: "Isaiah 41:10", book: "ISA", chapter: 41, theme: "Courage" },
  { text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", reference: "Galatians 5:22–23", book: "GAL", chapter: 5, theme: "Character" },
  { text: "I will praise you, Lord, with all my heart; I will tell of all your wonderful deeds.", reference: "Psalm 9:1", book: "PSA", chapter: 9, theme: "Praise" },
  { text: "Greater love has no one than this: to lay down one's life for one's friends.", reference: "John 15:13", book: "JHN", chapter: 15, theme: "Love" },
  { text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", reference: "Psalm 34:18", book: "PSA", chapter: 34, theme: "Comfort" },
  { text: "God is our refuge and strength, an ever-present help in trouble.", reference: "Psalm 46:1", book: "PSA", chapter: 46, theme: "Refuge" },
  { text: "No, in all these things we are more than conquerors through him who loved us.", reference: "Romans 8:37", book: "ROM", chapter: 8, theme: "Victory" },
  { text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.", reference: "Lamentations 3:22–23", book: "LAM", chapter: 3, theme: "Mercy" },
  { text: "For nothing will be impossible with God.", reference: "Luke 1:37", book: "LUK", chapter: 1, theme: "Faith" },
  { text: "Do not let your hearts be troubled. You believe in God; believe also in me.", reference: "John 14:1", book: "JHN", chapter: 14, theme: "Peace" },
  { text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.", reference: "Philippians 4:19", book: "PHP", chapter: 4, theme: "Provision" },
  { text: "He heals the brokenhearted and binds up their wounds.", reference: "Psalm 147:3", book: "PSA", chapter: 147, theme: "Healing" },
  { text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", reference: "2 Timothy 1:7", book: "2TI", chapter: 1, theme: "Courage" },
  { text: "I lift up my eyes to the mountains — where does my help come from? My help comes from the Lord, the Maker of heaven and earth.", reference: "Psalm 121:1–2", book: "PSA", chapter: 121, theme: "Help" },
  { text: "Delight yourself in the Lord, and he will give you the desires of your heart.", reference: "Psalm 37:4", book: "PSA", chapter: 37, theme: "Joy" },
  { text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", reference: "Philippians 4:7", book: "PHP", chapter: 4, theme: "Peace" },
  { text: "Jesus wept.", reference: "John 11:35", book: "JHN", chapter: 11, theme: "Compassion" },
  { text: "Love the Lord your God with all your heart and with all your soul and with all your mind.", reference: "Matthew 22:37", book: "MAT", chapter: 22, theme: "Love" },
  { text: "In him we have redemption through his blood, the forgiveness of sins.", reference: "Ephesians 1:7", book: "EPH", chapter: 1, theme: "Forgiveness" },
  { text: "Now faith is confidence in what we hope for and assurance about what we do not see.", reference: "Hebrews 11:1", book: "HEB", chapter: 11, theme: "Faith" },
  { text: "For we are God's handiwork, created in Christ Jesus to do good works.", reference: "Ephesians 2:10", book: "EPH", chapter: 2, theme: "Purpose" },
  { text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.", reference: "Numbers 6:24–25", book: "NUM", chapter: 6, theme: "Blessing" },
  { text: "Wait for the Lord; be strong and take heart and wait for the Lord.", reference: "Psalm 27:14", book: "PSA", chapter: 27, theme: "Patience" },
  { text: "If we confess our sins, he is faithful and just and will forgive us our sins.", reference: "1 John 1:9", book: "1JN", chapter: 1, theme: "Forgiveness" },
  { text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, can separate us from the love of God.", reference: "Romans 8:38–39", book: "ROM", chapter: 8, theme: "Love" },
  { text: "Set your minds on things above, not on earthly things.", reference: "Colossians 3:2", book: "COL", chapter: 3, theme: "Focus" },
  { text: "Let everything that has breath praise the Lord.", reference: "Psalm 150:6", book: "PSA", chapter: 150, theme: "Praise" },
  { text: "Taste and see that the Lord is good; blessed is the one who takes refuge in him.", reference: "Psalm 34:8", book: "PSA", chapter: 34, theme: "Goodness" },
  { text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.", reference: "Psalm 23:4", book: "PSA", chapter: 23, theme: "Comfort" },
  { text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.", reference: "Matthew 7:7", book: "MAT", chapter: 7, theme: "Prayer" },
  { text: "Blessed are the pure in heart, for they will see God.", reference: "Matthew 5:8", book: "MAT", chapter: 5, theme: "Purity" },
  { text: "How beautiful on the mountains are the feet of those who bring good news.", reference: "Isaiah 52:7", book: "ISA", chapter: 52, theme: "Purpose" },
  { text: "I have hidden your word in my heart that I might not sin against you.", reference: "Psalm 119:11", book: "PSA", chapter: 119, theme: "Scripture" },
  { text: "The earth is the Lord's, and everything in it, the world, and all who live in it.", reference: "Psalm 24:1", book: "PSA", chapter: 24, theme: "Worship" },
  { text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", reference: "Galatians 6:9", book: "GAL", chapter: 6, theme: "Perseverance" },
];

const getDailyVerse = (): DailyVerse => {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
};

const VerseOfTheDay: React.FC = () => {
  const history = useHistory();
  const { chosenBible } = useAppContext();
  const [shared, setShared] = useState(false);

  const verse = useMemo(() => getDailyVerse(), []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleReadInContext = () => {
    if (chosenBible) {
      history.push(
        `/read/${chosenBible.languageId}/${chosenBible.abbr}/${verse.book}/${verse.chapter}`
      );
    } else {
      history.push(`/read`);
    }
  };

  const handleShare = () => {
    const appUrl = getBibleUrl();
    const text = `Verse of the Day\n\n"${verse.text}"\n— ${verse.reference}\n\n${appUrl}`;
    if (navigator.share) {
      navigator.share({
        title: "Verse of the Day — Daylybread",
        text,
        url: appUrl,
      });
    } else {
      navigator.clipboard?.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <section className="verse-of-the-day" aria-label="Verse of the day">
      <div className="home-section-header">
        <IonText>
          <h2 className="home-section-title">Verse of the Day</h2>
        </IonText>
        <p className="home-section-subtitle">{today}</p>
      </div>

      <div className="votd-card">
        <div className="votd-header">
          <div className="votd-label">
            <IonIcon icon={sunnyOutline} className="votd-sun-icon" />
            <span className="votd-label-text">Today&apos;s reading</span>
          </div>
          <span className="votd-theme-badge">{verse.theme}</span>
        </div>

        <div className="votd-verse-block">
          <IonText>
            <p className="votd-verse-text">&ldquo;{verse.text}&rdquo;</p>
            <p className="votd-reference">— {verse.reference}</p>
          </IonText>
        </div>

        <div className="votd-actions">
          <IonButton
            fill="solid"
            size="small"
            color="primary"
            className="votd-btn"
            onClick={handleReadInContext}
          >
            <IonIcon icon={bookOutline} slot="start" />
            Read in Context
          </IonButton>
          <IonButton
            fill="outline"
            size="small"
            className="votd-btn"
            onClick={handleShare}
          >
            <IonIcon icon={share} slot="start" />
            {shared ? "Copied" : "Share"}
          </IonButton>
        </div>
      </div>
    </section>
  );
};

export default VerseOfTheDay;
