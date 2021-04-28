import Head from "next/head";
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[welcome to Apple]</p>
        <p>Simple しか勝たん Apple 信者です。</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

//SSGの準備（buildされる時にこの関数が呼ばれる)
//あくまでも取得する関数
//この関数が無かったらCSRになる
//pagesの中でしか出来ない
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      //propsとしてhome componentに渡している
      allPostsData,
    },
  };
}
