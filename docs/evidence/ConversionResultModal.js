import {Modal, initTooltip, selectRef, BlockUI, fetchDataUrl} from './libs/metronic-extension/dist/build.esm.js';
import hbs from './libs/handlebars-extd/dist/build.esm.js';

export default class extends Modal {
  #currentRowIndex;
  #evidenceTable;
  #tooltips = [];
  #total;
  #ref;

  async init(currentRowIndex, evidenceTable) {
    this.#currentRowIndex = currentRowIndex;
    this.#evidenceTable = evidenceTable;
    this.#total = this.#evidenceTable.getRowNodes().length;
    const node = this.#render(currentRowIndex);
    this.#ref = selectRef(node);
    const instance = new bootstrap.Modal(node);
    this.#initForm(node);
    return [node, instance];
  }

  afterShown() {
    for (let tooltip of this.#tooltips)
      tooltip.show();
    this.#drawImage();
  }

  dispose() {
    super.dispose();
    for (let tooltip of this.#tooltips)
      tooltip.dispose();
    this.#tooltips = [];
  }

  #getRowDataByIndex(currentRowIndex) {
    const rows = this.#evidenceTable.getRowNodes();
    const row = rows[currentRowIndex];
    return this.#evidenceTable.getRowData(row);
  }

  #moveImage(directions) {
    if (directions === 'next')
      ++this.#currentRowIndex;
    else
      --this.#currentRowIndex;
    this.#ref.modalBody.scrollTop(0);
    this.#drawImage();
    this.#ref.previousButton.prop('disabled', this.#currentRowIndex === 0);
    this.#ref.nextButton.prop('disabled', this.#currentRowIndex === this.#total - 1);
    const rowData = this.#getRowDataByIndex(this.#currentRowIndex);
    this.#ref.fileName.text(rowData.fileName);
    this.#ref.sourceImage.attr('src', rowData.sourceImage);
    this.#ref.destinationImage.attr('src', rowData.destinationImage);
    this.#ref.currentRowPosition.text(this.#currentRowIndex + 1);
  }

  async #drawImage() {
    super.showBlockUI('Loading...');
    // this.#ref.sourceImage.attr('src', '');
    // this.#ref.destinationImage.attr('src', '');
    const rowData = this.#getRowDataByIndex(this.#currentRowIndex);
    const dataUrls = await Promise.all([
      fetchDataUrl(rowData.sourceImage),
      fetchDataUrl(rowData.destinationImage)
    ]);
    this.#ref.sourceImage.attr('src', dataUrls[0]);
    this.#ref.destinationImage.attr('src', dataUrls[1]);
    super.hideBlockUI();
  }

  #initForm(node) {
    this.#tooltips = initTooltip(node);
    node
      .on('click', '[data-on-next]', () => this.#moveImage('next'))
      .on('click', '[data-on-previous]', () => this.#moveImage('previous'));
  }

  #render(currentRowIndex) {
    const html = hbs.compile(
      `<div class="modal fade" tabindex="-1" aria-hidden="true" id="conversionResultModal">
        <!--begin::Modal dialog-->
        <div class="modal-dialog modal-fullscreen">
          <!--begin::Modal content-->
          <div class="modal-content shadow-none">
            <!--begin::Modal header-->
            <div class="modal-header">
              <!--begin::Modal title-->
              <h2 class="fw-normal d-flex align-items-baseline">
                <div data-ref="fileName">{{rowData.fileName}}</div>
                <div class="ms-3 fs-6 text-gray-700">Showing number <span data-ref="currentRowPosition">{{currentRowPosition}}</span> of {{total}}</div>
              </h2>
              <!--end::Modal title-->
              <!--begin::Close-->
              <div class="btn btn-sm btn-icon btn-secondary" data-bs-dismiss="modal"
              {{!-- <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal" --}}
                data-bs-toggle="tooltip" data-bs-dismiss="click" title="Close the modal." data-bs-container="#conversionResultModal">
                <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                <span class="svg-icon svg-icon-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                  <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                </svg></span>
                <!--end::Svg Icon-->
              </div>
              <!--end::Close-->
            </div>
            <!--end::Modal header-->
            <!--begin::Modal body-->
            <div data-ref="modalBody" class="modal-body py-lg-10 px-lg-10">
              <!--begin::Next button-->
              <button
                data-ref="nextButton"
                data-on-next
                {{#if (eq currentRowPosition total)}}disabled{{/if}}
                type="button" class="btn btn-icon btn-primary position-fixed top-50 end-0 translate-middle-y"
                data-bs-toggle="tooltip" data-bs-dismiss="click" title="Next document." data-bs-container="#conversionResultModal">
                <span class="svg-icon svg-icon-1">
                  <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2022-12-26-231111/core/html/src/media/icons/duotune/arrows/arr023.svg-->
                  <span class="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 4L14 12L6 20H10L17.3 12.7C17.7 12.3 17.7 11.7 17.3 11.3L10 4H6Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <!--end::Svg Icon-->
                </span>
              </button>
              <!--end::Next button-->
              <!--begin::Previous button-->
              <button
                data-ref="previousButton"
                data-on-previous
                {{#if (eq currentRowPosition 1)}}disabled{{/if}}
                type="button" class="btn btn-icon btn-primary position-fixed top-50 start-0 translate-middle-y"
                data-bs-toggle="tooltip" data-bs-dismiss="click" title="Previous document." data-bs-container="#conversionResultModal">
                <span class="svg-icon svg-icon-1">
                  <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2022-12-26-231111/core/html/src/media/icons/duotune/arrows/arr022.svg-->
                  <span class="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.6 4L9.6 12L17.6 20H13.6L6.3 12.7C5.9 12.3 5.9 11.7 6.3 11.3L13.6 4H17.6Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <!--end::Svg Icon-->
                </span>
              </button>
              <!--end::Previous button-->
              <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2022-12-26-231111/core/html/src/media/icons/duotune/arrows/arr064.svg-->
              <span class="svg-icon svg-icon-dark position-fixed top-50 start-50 translate-middle">
                <svg class="h-75px w-75px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"/>
                  <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"/>
                </svg>
              </span>
              <!--end::Svg Icon-->
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col Set the right margin so that the arrow icon does not overlap with the image.-->
                <div class="col" style="padding-right: calc(75px * 0.5);">
                  <img data-ref="sourceImage" --src="{{rowData.sourceImage}}" class="w-100">
                </div>
                <!--end::Col-->
                <!--begin::Col Set the left margin so that the arrow icon does not overlap with the image.-->
                <div class="col" style="padding-left: calc(75px * 0.5);">
                  <img data-ref="destinationImage" --src="{{rowData.destinationImage}}" class="w-100">
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Modal body-->
          </div>
          <!--end::Modal content-->
        </div>
        <!--end::Modal dialog-->
      </div>`)({
        rowData: this.#getRowDataByIndex(currentRowIndex),
        total: this.#total,
        currentRowPosition: currentRowIndex + 1,
      });
    return $(html).appendTo('body');
  }
}