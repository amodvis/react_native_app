import React, { Component } from 'react';
import * as B from '../../block';
import { View } from 'react-native';
const envJson = require('../../.env.json');

const cre = React.createElement;

class CommonPage extends Component {
  constructor(props) {
    super(props);
    this.screenProps = props.screenProps;
    console.log('CommonPage -------- constructor');
    this.state = {
      page_module_data: {},
      moduleFetchUrl: envJson.moduleFetchUrl,
      data: this.screenProps.data,
      is_pull_update: this.screenProps.is_pull_update,
      is_cdn_cache: this.screenProps.is_cdn_cache,
      is_user_auth: this.screenProps.is_user_auth,
    };
    this.modProps = this.modProps.bind(this);
    this.getSections = this.getSections.bind(this);
    this.colMain = this.colMain.bind(this);
  }

  componentDidMount = () => {

  }

  modProps = (page_part, i, type_key, j, val) => {
    const item = this.screenProps.data[page_part][i][type_key][j];
    const key = `${item.project_name}/${item.module_name}/${item.page_name}/${item.position}`;
    this.state.data[page_part][i][type_key][j].module_data = val[key];
  }

  getDetail = (sectionItem) => {
    return Object.values(sectionItem)
      .map((cn, j) => {
        const projectName = cn.project_name;
        const moduleName = cn.module_name;
        const key = `${cn.project_name}/${cn.module_name}/${cn.page_name}/${cn.position}`;
        let moduleData = cn.module_data;
        if (this.state.page_module_data && this.state.page_module_data[key]) {
          moduleData = this.state.page_module_data[key];
        }
        return (
          cre(B[projectName][moduleName], { key: j, 'data-key': j, module_data: moduleData }, null)
        );
      });
  };

  getColContent = (section, height, fadeIn) => {
    return Object.values(section)
      .map((sectionItem, j) => {
        const className = Object.keys(section)[j];
        return (
          <View
            key={`module-${className}`}
            className={`${className}`}
            data-key={`module-${className}`}
          >
            {this.getDetail(sectionItem)}
          </View >
        );
      });
  };

  getSections = (sections, height, fadeIn) => {
    return sections.length && sections.map((section, i) => {
      return this.colMain(section, i, height, fadeIn);
    });
  };

  colMain = (section, i, height, fadeIn) => {
    if (Object.values(section).length > 1) {
      return cre('div', {
        className: 'col_main',
        key: `col_main-${i}`,
        'data-key': `col_main-${i}`,
      }, this.getColContent(section, height, null));
    }
    return this.getColContent(section, height, fadeIn);
  };

  setLayout = (data) => {
    return Object.keys(data)
      .map((layout) => {
        return (
          <View id={layout} key={`layout-${layout}`} data-key={`layout-${layout}`}>
            {layout === 'bd' ? (
              data[layout].length ? this.getSections(data[layout], ``, 'fadeIn') : null
            ) : (data[layout].length ? this.getSections(data[layout]) : null)
            }
          </View>
        );
      });
  };

  componentWillUnmount() {

  }

  render() {
    return (
      <View id="page">
        {this.setLayout(this.state.data)}
      </View>
    );
  }
}

export default CommonPage;
