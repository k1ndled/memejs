import { time, checkSubreddit } from "./utils";

interface redditObject {
	title: string;
	url: string;
	author: string;
	subreddit: string;
	created: number;
	created_utc: number;
}

const subs: string[] = [
	'crappydesign',
	'dankmemes',
	'me_irl',
	'wholesomememes',
	'memeeconomy',
	'adviceanimals',
	'comedycemetery',
	'memes',
	'prequelmemes',
	'terriblefacebookmemes',
	'pewdiepiesubmissions',
	'funny'
];

export async function meme(reddit?: string, callback?: any) {
	if(callback) console.log('Callbacks are now deprecated please update your code.');
  if(!reddit) reddit = subs[~~(Math.random() * subs.length)];

	const url: string = `https://www.reddit.com/r/${reddit}.json?sort=top&t=day&limit=200`;
	let object;

  await checkSubreddit(url).then((body: any) => {
		if(!body.length) return console.log('No results found.');
		const math: number = Math.floor(Math.random() * Math.floor(body.length));
		const random = body[math].data;
		if(!/^.*\.(jpg?g|png|gif|gifv)$/.test(random.url)) return console.log('No results found.');
		const flair: string = random.link_flair_text;
		object = {
			title: random.title,
			flairText: flair ? flair : "",
			url: random.url,
			author: random.author,
			subreddit: random.subreddit,
			nsfw: random.over_18,
			created: time(random.created as number),
			created_utc: time(random.created_utc as number)
		}
	}).catch(e => new Error(e));
	return object;
}

(exports as any).memeAsync = meme;
