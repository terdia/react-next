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

         <style jsx>{`
            h1 {
                font-family: "Arial"; 
            }
            ul {
                list-style: none;
            }
            li {
                margin: 0;
            }
            a {
                text-decoration: none;
                color: green;
                font-family: "Arial";
            }
            a:hover {
                opacity: 0.6;
                color: green;
            }        
         `}</style>   
        </Layout>
    );
}

Index.getInitialProps = async () => {
    const batmanShow = await fetch('https://api.tvmaze.com/search/shows?q=batman');

    const response = await batmanShow.json();
    return { shows: response};
}

export default Index;