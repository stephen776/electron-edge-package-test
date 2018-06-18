import * as React from 'react';
import { Link } from 'react-router-dom';

let styles = require('./Home.scss');

const path = require('path');
const remote = require('electron').remote;

/**
 * get the proper path
 * to the dotnet dll resources in dev and
 * production configurations.
 */
const appPath =
  process.env.NODE_ENV === 'production'
    ? remote.app.getAppPath()
    : path.join(path.resolve('.'), 'app/');

const baseNetAppPath = path.join(
  appPath,
  '/dotnet/Quickstart.Core/bin/Debug/netcoreapp2.0',
);

process.env.EDGE_USE_CORECLR = '1';
process.env.EDGE_APP_ROOT = baseNetAppPath;

console.log('appPath', appPath);
console.log('EDGE_APP_ROOT', process.env.EDGE_APP_ROOT);
console.log('EDGE_BOOTSTRAP_DIR', process.env.EDGE_BOOTSTRAP_DIR);
console.log('USE_CORE_CLR', process.env.EDGE_USE_CORECLR);

var edge = require('electron-edge-js');

var useDynamicInput = edge.func({
  assemblyFile: path.join(baseNetAppPath, 'QuickStart.Core.dll'),
  typeName: 'QuickStart.Core.LocalMethods',
  methodName: 'UseDynamicInput'
});

export default class Home extends React.Component {
  render() {
    useDynamicInput('HELLO ELECTRON', (error: any, result: any) => {
      console.log('RESULT:', result);
    });

    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
