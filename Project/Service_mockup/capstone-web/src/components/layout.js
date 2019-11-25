/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { SnackbarProvider } from 'notistack';

import Header from './header';
import './layout.css';

const Layout = ({ children, location }) => {
  const noShell = <SnackbarProvider>
    {children}
  </SnackbarProvider>;
  if (location.pathname === '/') return noShell;
  if (location.pathname === '/signup') return noShell;
  if (location.pathname === '/signup/') return noShell;

  return (
    <SnackbarProvider>
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <div style={{ minHeight: '100vh', backgroundColor: '#FFF' }}>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0px 1.0875rem 1.45rem`,
                paddingTop: 100,
              }}
            >
              <main>{children}</main>
              <footer style={{ paddingTop: 10 }}>
                © {new Date().getFullYear()}, 캡스톤 판매자용 페이지
              </footer>
            </div>
          </div>
        )}
      />
    </SnackbarProvider>
  )
}

export default Layout;
