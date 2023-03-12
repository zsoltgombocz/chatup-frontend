import RadialMenu from "react-radial-menu"

const items = [
    { "href": "http://www.facebook.com", "image": "url(examples/dist/images/social/facebook.png)" },
    { "href": "http://www.reddit.com", "image": "url(examples/dist/images/social/reddit.png)" },
    { "href": "http://www.flickr.com", "image": "url(examples/dist/images/social/flickr.png)" },
    { "href": "http://www.google.com", "image": "url(examples/dist/images/social/googleplus.png)" },
    { "href": "http://www.linkedin.com", "image": "url(examples/dist/images/social/linkedin.png)" },
    { "href": "http://www.twitter.com", "image": "url(examples/dist/images/social/twitter.png)" },
    { "href": "http://www.twitter.com", "image": "url(examples/dist/images/social/twitter.png)" }
];

const center = {
    "image": "url(examples/dist/images/social/share.png)"
};

const PlanetMenu = ({ className }) => {
    return (
        <div className={`${className} relative`}>
            <RadialMenu
                items={items}
                center={center}
            />
        </div>
    )
}

export default PlanetMenu