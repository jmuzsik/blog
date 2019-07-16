import React, { useRef, useEffect } from 'react';
import styles from './Page.module.scss';

type Props = {
  title?: string,
  children: React.Node
};

const data = {
  facebook: {
    'Be bold':
      "Building great things means taking risks. We have a saying: The riskiest thing is to take no risks. in a world that's changing so quickly you're guaranteed to fail if you dont take any risks.",
    'Focus on Impact':
      'To make the most impact, we need to solve the most important problems. We expect Facebook employees to avoid wasting time on minor issues and focus on truly big challenges.',
    'Move Fast':
      'We believe that it’s better to move fast and make mistakes than to move slowly and miss opportunities. Doing so enables us to build more things and learn faster.',
    'Be Open':
      'Informed people make better decisions and make a greater impact — so we work hard to ensure that everyone at Facebook can access as much information about the company as possible.',
    'Build Social Value':
      'At Facebook, we’re trying to bring the world closer together — not just grow our business. Our people focus on creating real value for the world — every day and in everything they do.'
  },
  google: {
    'Focus on the user and all else will follow':
      'Since the beginning, we’ve focused on providing the best user experience possible. Whether we’re designing a new Internet browser or a new tweak to the look of the homepage, we take great care to ensure that they will ultimately serve you, rather than our own internal goal or bottom line. Our homepage interface is clear and simple, and pages load instantly. Placement in search results is never sold to anyone, and advertising is not only clearly marked as such, it offers relevant content and is not distracting. And when we build new tools and applications, we believe they should work so well you don’t have to consider how they might have been designed differently.',
    'It’s best to do one thing really, really well':
      'We do search. With one of the world’s largest research groups focused exclusively on solving search problems, we know what we do well, and how we could do it better. Through continued iteration on difficult problems, we’ve been able to solve complex issues and provide continuous improvements to a service that already makes finding information a fast and seamless experience for millions of people. Our dedication to improving search helps us apply what we’ve learned to new products, like Gmail and Google Maps. Our hope is to bring the power of search to previously unexplored areas, and to help people access and use even more of the ever-expanding information in their lives.',
    'Fast is better than slow.':
      'We know your time is valuable, so when you’re seeking an answer on the web you want it right away–and we aim to please. We may be the only people in the world who can say our goal is to have people leave our website as quickly as possible. By shaving excess bits and bytes from our pages and increasing the efficiency of our serving environment, we’ve broken our own speed records many times over, so that the average response time on a search result is a fraction of a second. We keep speed in mind with each new product we release, whether it’s a mobile application or Google Chrome, a browser designed to be fast enough for the modern web. And we continue to work on making it all go even faster.',
    'Democracy on the web works':
      'Google search works because it relies on the millions of individuals posting links on websites to help determine which other sites offer content of value. We assess the importance of every web page using more than 200 signals and a variety of techniques, including our patented PageRank™ algorithm, which analyzes which sites have been “voted” to be the best sources of information by other pages across the web. As the web gets bigger, this approach actually improves, as each new site is another point of information and another vote to be counted. In the same vein, we are active in open source software development, where innovation takes place through the collective effort of many programmers.',
    'You don’t need to be at your desk to need an answer':
      'The world is increasingly mobile: people want access to information wherever they are, whenever they need it. We’re pioneering new technologies and offering new solutions for mobile services that help people all over the globe to do any number of tasks on their phone, from checking email and calendar events to watching videos, not to mention the several different ways to access Google search on a phone. In addition, we’re hoping to fuel greater innovation for mobile users everywhere with Android, a free, open source mobile platform. Android brings the openness that shaped the Internet to the mobile world. Not only does Android benefit consumers, who have more choice and innovative new mobile experiences, but it opens up revenue opportunities for carriers, manufacturers and developers.',
    'You can make money without doing evil':
      'Google is a business. The revenue we generate is derived from offering search technology to companies and from the sale of advertising displayed on our site and on other sites across the web. Hundreds of thousands of advertisers worldwide use AdWords to promote their products; hundreds of thousands of publishers take advantage of our AdSense program to deliver ads relevant to their site content. To ensure that we’re ultimately serving all our users (whether they are advertisers or not), we have a set of guiding principles for our advertising programs and practices: We don’t allow ads to be displayed on our results pages unless they are relevant where they are shown. And we firmly believe that ads can provide useful information if, and only if, they are relevant to what you wish to find–so it’s possible that certain searches won’t lead to any ads at all. We believe that advertising can be effective without being flashy. We don’t accept pop–up advertising, which interferes with your ability to see the content you’ve requested. We’ve found that text ads that are relevant to the person reading them draw much higher clickthrough rates than ads appearing randomly. Any advertiser, whether small or large, can take advantage of this highly targeted medium. Advertising on Google is always clearly identified as a “Sponsored Link,” so it does not compromise the integrity of our search results. We never manipulate rankings to put our partners higher in our search results and no one can buy better PageRank. Our users trust our objectivity and no short-term gain could ever justify breaching that trust.',
    'There’s always more information out there':
      'Once we’d indexed more of the HTML pages on the Internet than any other search service, our engineers turned their attention to information that was not as readily accessible. Sometimes it was just a matter of integrating new databases into search, such as adding a phone number and address lookup and a business directory. Other efforts required a bit more creativity, like adding the ability to search news archives, patents, academic journals, billions of images and millions of books. And our researchers continue looking into ways to bring all the world’s information to people seeking answers.',
    'The need for information crosses all borders':
      'Our company was founded in California, but our mission is to facilitate access to information for the entire world, and in every language. To that end, we have offices in more than 60 countries, maintain more than 180 Internet domains, and serve more than half of our results to people living outside the United States. We offer Google’s search interface in more than 130 languages, offer people the ability to restrict results to content written in their own language, and aim to provide the rest of our applications and products in as many languages and accessible formats as possible. Using our translation tools, people can discover content written on the other side of the world in languages they don’t speak. With these tools and the help of volunteer translators, we have been able to greatly improve both the variety and quality of services we can offer in even the most far–flung corners of the globe.',
    'You can be serious without a suit':
      'Our founders built Google around the idea that work should be challenging, and the challenge should be fun. We believe that great, creative things are more likely to happen with the right company culture–and that doesn’t just mean lava lamps and rubber balls. There is an emphasis on team achievements and pride in individual accomplishments that contribute to our overall success. We put great stock in our employees–energetic, passionate people from diverse backgrounds with creative approaches to work, play and life. Our atmosphere may be casual, but as new ideas emerge in a café line, at a team meeting or at the gym, they are traded, tested and put into practice with dizzying speed–and they may be the launch pad for a new project destined for worldwide use.',
    'Great just isn’t good enough':
      'We see being great at something as a starting point, not an endpoint. We set ourselves goals we know we can’t reach yet, because we know that by stretching to meet them we can get further than we expected. Through innovation and iteration, we aim to take things that work well and improve upon them in unexpected ways. For example, when one of our engineers saw that search worked well for properly spelled words, he wondered about how it handled typos. That led him to create an intuitive and more helpful spell checker. Even if you don’t know exactly what you’re looking for, finding an answer on the web is our problem, not yours. We try to anticipate needs not yet articulated by our global audience, and meet them with products and services that set new standards. When we launched Gmail, it had more storage space than any email service available. In retrospect offering that seems obvious–but that’s because now we have new standards for email storage. Those are the kinds of changes we seek to make, and we’re always looking for new places where we can make a difference. Ultimately, our constant dissatisfaction with the way things are becomes the driving force behind everything we do.'
  },
  amazon: {
    'Customer Obsession':
      'Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust. Although leaders pay attention to competitors, they obsess over customers.',
    Ownership:
      'Leaders are owners. They think long term and don’t sacrifice long-term value for short-term results. They act on behalf of the entire company, beyond just their own team. They never say “that’s not my job.',
    'Invent and Simplify':
      'Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere, and are not limited by“not invented here. As we do new things, we accept that we may be misunderstood for long periods of time.',
    'Are Right, A Lot':
      'Leaders are right a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.',
    'Learn and Be Curious':
      'Leaders are never done learning and always seek to improve themselves. They are curious about new possibilities and act to explore them.',
    'Hire and Develop the Best':
      'Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent, and willingly move them throughout the organization. Leaders develop leaders and take seriously their role in coaching others. We work on behalf of our people to invent mechanisms for development like Career Choice.',
    'Insist on the Highest Standards':
      'Leaders have relentlessly high standards — many people may think these standards are unreasonably high. Leaders are continually raising the bar and drive their teams to deliver high quality products, services, and processes. Leaders ensure that defects do not get sent down the line and that problems are fixed so they stay fixed.',
    'Think Big':
      'Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction that inspires results. They think differently and look around corners for ways to serve customers.',
    'Bias for Action':
      'Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking',
    Frugality:
      'Accomplish more with less. Constraints breed resourcefulness, self-sufficiency, and invention. There are no extra points for growing headcount, budget size, or fixed expense',
    'Earn Trust':
      'Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical, even when doing so is awkward or embarrassing. Leaders do not believe their or their team’s body odor smells of perfume. They benchmark themselves and their teams against the best',
    'Dive Deep':
      'Leaders operate at all levels, stay connected to the details, audit frequently, and are skeptical when metrics and anecdote differ. No task is beneath them',
    'Have Backbone; Disagree and Commit':
      'Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Leaders have conviction and are tenacious. They do not compromise for the sake of social cohesion. Once a decision is determined, they commit wholly',
    'Deliver Results':
      'Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion. Despite setbacks, they rise to the occasion and never settle'
  },
  apple: {
    Manifesto:
      "There is an extraordinary breadth and depth in our more than 35,000 employees, who are all wicked smart. And that's in all areas of the company from engineering to marketing, operations and sales and all the rest. The values of our company are all extremely well entrenched. We believe that we're on the face of the earth to make great products and that's not changing. We're constantly focusing on innovating. We believe in the simple, not the complex. We believe we need to own and control the primary technologies behind the products that we make and participate only in markets where we can make a significant contribution. We believe in saying no to thousands of projects so that we can focus on the few that are meaningful to us. We believe in deep collaboration and cross pollination in order to innovate in a way others cannot. We don't settle for anything other than excellence in any group in the company, and we have the self-honesty to admit when we're wrong and the courage to change. Regardless of who is in what job, those values are so embedded in this company that Apple will do extremely well. And I would just iterate a point Peter made in his opening comments. I strongly believe that Apple is doing the best work in its history."
  },
  Microsoft: {
    Innovation:
      'We believe technology can and should be a force for good and that meaningful innovation can and will contribute to a brighter world in big and small ways',
    'Diversity and inclusion':
      'We thrive on diverse voices. We engage our employees’ and customers’ experiences, strengths, and different points of view to inform, challenge, and stretch our thinking. This is how we innovate',
    'Corporate social responsibility':
      'See how we work to be a responsible partner to those who place their trust in us, conducting business in a way that is inclusive, transparent, and respectful of human rights',
    Philanthropies:
      'Find out how we empower people by investing technology, money, employee talent, and the company’s voice in programs that promote digital inclusion.',
    AI:
      'We believe that, when designed with people at the center, AI can extend your capabilities, free you up for more creative and strategic endeavors, and help you or your organization achieve more.'
  },
  Samsung: {
    People:
      "Quite simply, a company is its people. Ay Samsung, we're dedicated to giving our people a wealth of opportunities to reach their full potential",
    Excellence:
      'Everything we do at Samsung is driven by an unyielding passion for excellence and an unfaltering commitment to develop the best products and services on the market',
    Change:
      'As we have done since our foundation, we set our sights on the future, anticipating market needs and demands so we can steer our company toward long-term success',
    Integrity:
      'Operating in an ethical way is the foundation of our business. Everything we do is guided by a moral compass that ensures fairness, respect for all stakeholders and complete transparency',
    'Co-prosperity':
      'Samsung is committed to becoming a socially and environmentally responsible corporate citizen in all of its communities worldwide'
  },
  Intel: {
    Quality:
      "There's a strong commitment at Intel to quality and continuous improvement. This commitment extends to all levels of the company. We strive to achieve the highest standards of excellence; do the right things right; continuously learn, develop, and improve; and take pride in our work.",
    'Risk Taking':
      'Risk taking recognizes that some failures are unavoidable. Some experiments will generate favorable outcomes, while others will lead to disappointment. But even the disappointments can be turned into gains. We strive to embrace a growth mindset in everything we do, foster innovation and creative thinking, embrace change and challenge the status quo, listen to all ideas and viewpoints, learn from our successes and mistakes, and encourage and reward informed risk taking',
    'An Inclusive, Great Place to Work':
      'At Intel, we believe a productive and challenging work environment is vital to our success. This requires an open, candid, and respectful approach to working with one another. Building trust and maintaining dignity are critical in our very diverse global workforce and environment. Ultimately, we want every employee to look forward to coming to work each day. We strive to create an inclusive work environment that fosters diversity; treat one another equally, with dignity and respect; be open and direct; promote a challenging work environment that develops our workforce; work as a team with respect and trust for each other; win and have fun; recognize and reward accomplishments; manage performance fairly and firmly; and be an asset to our communities worldwide',
    Discipline:
      "Our employees pride themselves on their ability to make and meet commitments, a quality we're able to attain by clearly communicating our intentions and expectations. We strive to conduct business with uncompromising integrity and professionalism; ensure a safe, clean, and injury-free workplace; make and meet commitments; properly plan, fund, and staff projects; pay attention to detail; and keep Intel information secure. Discipline is all about planning. A lot of people think that it's presentation skills, but it's really preparation skills.",
    'Customer Orientation':
      "Intel's concept of customer orientation goes beyond conducting business in the marketplace. It's absolutely crucial that we listen and respond to our team members within Intel in a cooperative and supportive manner. We listen and respond to our customers, suppliers, and stakeholders; clearly communicate mutual intentions and expectations; deliver innovative and competitive products and services; make it easy to work with us; and excel at customer satisfaction",
    'Results Orientation':
      'We strive to set challenging and competitive goals, focus on output, assume responsibility, and execute flawlessly. To help drive that process, we encourage each other to assume responsibility and to confront and solve the inevitable problems that arise along the way. Our well-known practice of constructive confrontation has served us well in recognizing issues early and dealing with them quickly and efficiently in a problem-solving mode'
  },
  Oracle: {
    Communication:
      'We share information effectively with each other, but also know how to protect the confidentiality of our information',
    'Customer Satisfaction': 'We treat customer satisfaction as a top priority',
    Fairness:
      'We deal fairly with customers, suppliers, partners, and colleagues',
    Integrity:
      'We are honest and choose the path of integrity in all business transactions and dealings with others',
    Quality:
      'We incorporate excellence and quality in our work and strive to continuously improve',
    Compliance:
      'We comply with all laws, regulations, and Oracle policies that govern our business and employees’ actions on behalf of the company',
    Ethics: 'We act ethically in every business context',
    Innovation:
      'We innovate and seek new and creative approaches to problem-solving',
    'Mutual Respect': 'We treat individuals with respect and dignity',
    Teamwork: 'We work together as a team to benefit Oracle'
  }
};

const companies = Object.keys(data);

const keys = [];
const values = [];
companies.forEach(company => {
  const currentCompany = data[company];
  const companyKeys = Object.keys(currentCompany);
  companyKeys.forEach(companyKey => {
    const cleanedKey = companyKey.toLowerCase().replace(/[\[\]&.,—;(’]+/g, '');
    keys.push(cleanedKey);
    const currentCompanyValue = currentCompany[companyKey];
    const cleanedValue = currentCompanyValue
      .toLowerCase()
      .replace(/[\[\]&.,—;’]+/g, '');
    values.push(cleanedValue);
  });
});

const valuesHash = {};
values.forEach(value => {
  const splitValue = value.split(' ');
  splitValue.forEach(word => {
    if (!valuesHash[word]) valuesHash[word] = 1;
    else {
      valuesHash[word] += 1;
    }
  });
});
const valueHashKeys = Object.keys(valuesHash);

valueHashKeys.forEach(key => {
  const value = valuesHash[key];
  if (value < 10) {
    delete valuesHash[key];
  }
});
console.log(valuesHash);

const keysHash = {};
keys.forEach(key => {
  const splitKey = key.split(' ');
  splitKey.forEach(word => {
    if (!keysHash[word]) keysHash[word] = 1;
    else {
      keysHash[word] += 1;
    }
  });
});
console.log(keysHash);

const Page = ({ title, children, current }: Props) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });
  return (
    <div ref={pageRef} className={styles['page']}>
      <div className={styles['page__inner']}>
        {title && <h1 className={styles['page__title']}>{title}</h1>}
        <div className={styles['page__body']}>{children}</div>
      </div>
    </div>
  );
};

export default Page;
