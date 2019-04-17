import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Reboot from '@material-ui/core/CssBaseline';
import getPageContext from './getPageContext';

function withRoot(Component) {
    let pageContext = null;
    class WithRoot extends React.Component {
        constructor(props, context) {
            super(props, context);

            pageContext = this.props.pageContext || getPageContext();
        }

        componentDidMount() {
            // Remove the server-side injected CSS.
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            // MuiThemeProvider makes the theme available down the React tree thanks to React context.
            return (
                <MuiThemeProvider
                    theme={pageContext.theme}
                    sheetsManager={pageContext.sheetsManager}
                >
                    {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <Reboot />
                    <Component {...this.props} />
                </MuiThemeProvider>
            );
        }
    }

    WithRoot.propTypes = {
        pageContext: PropTypes.object,
    };

    WithRoot.getInitialProps = ctx => {
        if (Component.getInitialProps) {
            return Component.getInitialProps(ctx);
        }

        return {};
    };

    return WithRoot;
}

export default withRoot;
