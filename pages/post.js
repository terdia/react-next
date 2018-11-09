import { withRouter } from 'next/router';
import Layout from '../components/Layout';

const getShowDetails = ({show}) => (
    <div>
        <h1>{ show.name }</h1>
        <p>{show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={show.image.medium}/>
    </div>
);

const Post = props => (
    <Layout>
        {getShowDetails(props)}
    </Layout>
);

Post.getInitialProps = async (context) => {
    const { id } = context.query;
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await response.json();
    return { show }
};

export default Post;