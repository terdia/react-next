import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


const displayTvShows = ({shows}) => {
    const data = shows.map(({show}) => {
        return (
            <li key={show.id}>
                <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                    <a>{ show.name }</a>
                </Link>
            </li> 
        );
    })

    return data;
}

const Index = (props) => {
    return (
        <Layout>
            <h1>Batman Tv Show</h1>
            <ul>
                {displayTvShows(props)}
            </ul>
        </Layout>
    );
}

Index.getInitialProps = async () => {
    const batmanShow = await fetch('https://api.tvmaze.com/search/shows?q=batman');

    const response = await batmanShow.json();
    return { shows: response};
}

export default Index;