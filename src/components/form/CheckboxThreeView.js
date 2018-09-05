import React, { Component } from 'react';


class CheckboxThreeView extends Component {
  render() {
    const {
      checked,
      defaultClassName,
      notActiveClass,
      ActiveClass,
      FullActiveClass,
      onChange,
      artifactId,
      contributorId,
    } = this.props;

    return (
      <label className="claim-panel__select_label">
        <input
          type="checkbox"
          checked={checked ? checked : false}
          className={
            "claim-panel__select_input  " +
            (defaultClassName ? ` ${defaultClassName} ` : '') +
            (notActiveClass ? ` ${notActiveClass} ` : '') +
            (ActiveClass ? ` ${ActiveClass} ` : '') +
            (FullActiveClass ? ` ${FullActiveClass} ` : '')
          }
          onChange={e => onChange( e.target.checked, contributorId, artifactId)}
        />
        <span className="claim-panel__select_checkbox icon-" />
      </label>
    );
  }
}

export default CheckboxThreeView;
