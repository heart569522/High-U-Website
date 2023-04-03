(() => {
  "use strict";
  var e = {
      810: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.MessageDeserializer = void 0),
          (t.MessageDeserializer = class {
            constructor() {
              (this._buffer = new ArrayBuffer(0)),
                (this._i32View = new Int32Array(this._buffer)),
                (this._f32View = new Float32Array(this._buffer)),
                (this._f64View = new Float64Array(this._buffer)),
                (this._u8View = new Uint8Array(this._buffer)),
                (this._u16View = new Uint16Array(this._buffer)),
                (this._u32View = new Uint32Array(this._buffer)),
                (this._offset = 0),
                (this._length = 0),
                (this._startOffset = -1),
                (this._processor = {
                  int: () => this._i32View[this._startOffset++],
                  bool: () => 1 === this._i32View[this._startOffset++],
                  type: () => this._i32View[this._startOffset++],
                  float: () => this._f32View[this._startOffset++],
                  timestamp: () => {
                    this._startOffset % 2 == 1 && this._startOffset++;
                    let e = this._f64View[this._startOffset / 2];
                    return (this._startOffset += 2), e;
                  },
                  string: () => {
                    let e = this._i32View[this._startOffset++],
                      t = new TextDecoder().decode(
                        new Uint8Array(this._buffer, 4 * this._startOffset, e)
                      );
                    return (
                      (this._startOffset += e >> 2),
                      0 != (3 & e) && this._startOffset++,
                      t
                    );
                  },
                  dataWithLength: () => {
                    let e = this._i32View[this._startOffset++],
                      t = new Uint8Array(e);
                    return (
                      t.set(
                        this._u8View.subarray(
                          4 * this._startOffset,
                          4 * this._startOffset + e
                        )
                      ),
                      (this._startOffset += t.byteLength >> 2),
                      0 != (3 & t.byteLength) && this._startOffset++,
                      t.buffer
                    );
                  },
                  matrix4x4: () => {
                    let e = this._i32View[this._startOffset++],
                      t = new Float32Array(e);
                    return (
                      t.set(
                        this._f32View.subarray(
                          this._startOffset,
                          this._startOffset + 16
                        )
                      ),
                      (this._startOffset += e),
                      t
                    );
                  },
                  identityCoefficients: () => {
                    let e = this._i32View[this._startOffset++],
                      t = new Float32Array(e);
                    return (
                      t.set(
                        this._f32View.subarray(
                          this._startOffset,
                          this._startOffset + 50
                        )
                      ),
                      (this._startOffset += e),
                      t
                    );
                  },
                  expressionCoefficients: () => {
                    let e = this._i32View[this._startOffset++],
                      t = new Float32Array(e);
                    return (
                      t.set(
                        this._f32View.subarray(
                          this._startOffset,
                          this._startOffset + 29
                        )
                      ),
                      (this._startOffset += e),
                      t
                    );
                  },
                  cameraModel: () => {
                    let e = this._i32View[this._startOffset++],
                      t = new Float32Array(e);
                    return (
                      t.set(
                        this._f32View.subarray(
                          this._startOffset,
                          this._startOffset + 6
                        )
                      ),
                      (this._startOffset += e),
                      t
                    );
                  },
                  barcodeFormat: () => this._i32View[this._startOffset++],
                  faceLandmarkName: () => this._i32View[this._startOffset++],
                  instantTrackerTransformOrientation: () =>
                    this._i32View[this._startOffset++],
                  logLevel: () => this._i32View[this._startOffset++],
                });
            }
            setData(e) {
              (this._buffer = e),
                (this._i32View = new Int32Array(this._buffer)),
                (this._f32View = new Float32Array(this._buffer)),
                (this._f64View = new Float64Array(this._buffer)),
                (this._u8View = new Uint8Array(this._buffer)),
                (this._u16View = new Uint16Array(this._buffer)),
                (this._u32View = new Uint32Array(this._buffer)),
                (this._offset = 0),
                (this._length = 0),
                e.byteLength >= 4 &&
                  ((this._offset = 1), (this._length = this._i32View[0])),
                (this._startOffset = -1);
            }
            hasMessage() {
              return this._offset + 1 < this._length;
            }
            forMessages(e) {
              for (; this.hasMessage(); ) {
                let t = this._i32View[this._offset],
                  r = this._i32View[this._offset + 1];
                (this._startOffset = this._offset + 2),
                  (this._offset += t),
                  e(r, this._processor);
              }
            }
          });
      },
      435: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Event5 = t.Event3 = t.Event2 = t.Event1 = t.Event = void 0),
          (t.Event = class {
            constructor() {
              this._funcs = [];
            }
            bind(e) {
              this._funcs.push(e);
            }
            unbind(e) {
              let t = this._funcs.indexOf(e);
              t > -1 && this._funcs.splice(t, 1);
            }
            emit() {
              for (var e = 0, t = this._funcs.length; e < t; e++)
                this._funcs[e]();
            }
          }),
          (t.Event1 = class {
            constructor() {
              this._funcs = [];
            }
            bind(e) {
              this._funcs.push(e);
            }
            unbind(e) {
              let t = this._funcs.indexOf(e);
              t > -1 && this._funcs.splice(t, 1);
            }
            emit(e) {
              for (var t = 0, r = this._funcs.length; t < r; t++)
                this._funcs[t](e);
            }
          }),
          (t.Event2 = class {
            constructor() {
              this._funcs = [];
            }
            bind(e) {
              this._funcs.push(e);
            }
            unbind(e) {
              let t = this._funcs.indexOf(e);
              t > -1 && this._funcs.splice(t, 1);
            }
            emit(e, t) {
              for (var r = 0, n = this._funcs.length; r < n; r++)
                this._funcs[r](e, t);
            }
          }),
          (t.Event3 = class {
            constructor() {
              this._funcs = [];
            }
            bind(e) {
              this._funcs.push(e);
            }
            unbind(e) {
              let t = this._funcs.indexOf(e);
              t > -1 && this._funcs.splice(t, 1);
            }
            emit(e, t, r) {
              for (var n = 0, a = this._funcs.length; n < a; n++)
                this._funcs[n](e, t, r);
            }
          }),
          (t.Event5 = class {
            constructor() {
              this._funcs = [];
            }
            bind(e) {
              this._funcs.push(e);
            }
            unbind(e) {
              let t = this._funcs.indexOf(e);
              t > -1 && this._funcs.splice(t, 1);
            }
            emit(e, t, r, n, a) {
              for (var i = 0, o = this._funcs.length; i < o; i++)
                this._funcs[i](e, t, r, n, a);
            }
          });
      },
      346: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.getRuntimeObject = void 0),
          (t.getRuntimeObject = function (e) {
            let t = e.cwrap("zappar_log_level", "number", []),
              r = e.cwrap("zappar_log_level_set", null, ["number"]),
              n = e.cwrap("zappar_analytics_project_id_set", null, ["string"]),
              a = e.cwrap("zappar_pipeline_create", "number", []),
              i = e.cwrap("zappar_pipeline_destroy", null, ["number"]),
              o = e.cwrap("zappar_pipeline_frame_update", null, ["number"]),
              s = e.cwrap("zappar_pipeline_frame_number", "number", ["number"]),
              u = e.cwrap("zappar_pipeline_camera_model", "number", ["number"]),
              _ = e.cwrap("zappar_pipeline_camera_frame_user_data", "number", [
                "number",
              ]),
              c = e.cwrap("zappar_pipeline_camera_frame_submit", null, [
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
              ]),
              f = e.cwrap(
                "zappar_pipeline_camera_frame_camera_attitude",
                "number",
                ["number"]
              ),
              l = e.cwrap("zappar_pipeline_motion_accelerometer_submit", null, [
                "number",
                "number",
                "number",
                "number",
                "number",
              ]),
              p = e.cwrap("zappar_pipeline_motion_rotation_rate_submit", null, [
                "number",
                "number",
                "number",
                "number",
                "number",
              ]),
              h = e.cwrap("zappar_pipeline_motion_attitude_submit", null, [
                "number",
                "number",
                "number",
                "number",
                "number",
              ]),
              m = e.cwrap("zappar_camera_source_create", "number", [
                "number",
                "string",
              ]),
              d = e.cwrap("zappar_camera_source_destroy", null, ["number"]),
              b = e.cwrap("zappar_image_tracker_create", "number", ["number"]),
              y = e.cwrap("zappar_image_tracker_destroy", null, ["number"]),
              v = e.cwrap(
                "zappar_image_tracker_target_load_from_memory",
                null,
                ["number", "number", "number"]
              ),
              g = e.cwrap(
                "zappar_image_tracker_target_loaded_version",
                "number",
                ["number"]
              ),
              w = e.cwrap("zappar_image_tracker_target_count", "number", [
                "number",
              ]),
              M = e.cwrap("zappar_image_tracker_enabled", "number", ["number"]),
              k = e.cwrap("zappar_image_tracker_enabled_set", null, [
                "number",
                "number",
              ]),
              z = e.cwrap("zappar_image_tracker_anchor_count", "number", [
                "number",
              ]),
              A = e.cwrap("zappar_image_tracker_anchor_id", "string", [
                "number",
                "number",
              ]),
              x = e.cwrap("zappar_image_tracker_anchor_pose_raw", "number", [
                "number",
                "number",
              ]),
              L = e.cwrap("zappar_face_tracker_create", "number", ["number"]),
              E = e.cwrap("zappar_face_tracker_destroy", null, ["number"]),
              C = e.cwrap("zappar_face_tracker_model_load_from_memory", null, [
                "number",
                "number",
                "number",
              ]),
              O = e.cwrap(
                "zappar_face_tracker_model_loaded_version",
                "number",
                ["number"]
              ),
              S = e.cwrap("zappar_face_tracker_enabled_set", null, [
                "number",
                "number",
              ]),
              T = e.cwrap("zappar_face_tracker_enabled", "number", ["number"]),
              P = e.cwrap("zappar_face_tracker_max_faces_set", null, [
                "number",
                "number",
              ]),
              I = e.cwrap("zappar_face_tracker_max_faces", "number", [
                "number",
              ]),
              B = e.cwrap("zappar_face_tracker_anchor_count", "number", [
                "number",
              ]),
              F = e.cwrap("zappar_face_tracker_anchor_id", "string", [
                "number",
                "number",
              ]),
              D = e.cwrap("zappar_face_tracker_anchor_pose_raw", "number", [
                "number",
                "number",
              ]),
              j = e.cwrap(
                "zappar_face_tracker_anchor_identity_coefficients",
                "number",
                ["number", "number"]
              ),
              R = e.cwrap(
                "zappar_face_tracker_anchor_expression_coefficients",
                "number",
                ["number", "number"]
              ),
              V = e.cwrap("zappar_face_mesh_create", "number", []),
              q = e.cwrap("zappar_face_mesh_destroy", null, ["number"]),
              G = e.cwrap("zappar_face_landmark_create", "number", ["number"]),
              N = e.cwrap("zappar_face_landmark_destroy", null, ["number"]),
              U = e.cwrap("zappar_barcode_finder_create", "number", ["number"]),
              W = e.cwrap("zappar_barcode_finder_destroy", null, ["number"]),
              H = e.cwrap("zappar_barcode_finder_enabled_set", null, [
                "number",
                "number",
              ]),
              Z = e.cwrap("zappar_barcode_finder_enabled", "number", [
                "number",
              ]),
              Y = e.cwrap("zappar_barcode_finder_found_number", "number", [
                "number",
              ]),
              X = e.cwrap("zappar_barcode_finder_found_text", "string", [
                "number",
                "number",
              ]),
              K = e.cwrap("zappar_barcode_finder_found_format", "number", [
                "number",
                "number",
              ]),
              J = e.cwrap("zappar_barcode_finder_formats", "number", [
                "number",
              ]),
              Q = e.cwrap("zappar_barcode_finder_formats_set", null, [
                "number",
                "number",
              ]),
              $ = e.cwrap("zappar_instant_world_tracker_create", "number", [
                "number",
              ]),
              ee = e.cwrap("zappar_instant_world_tracker_destroy", null, [
                "number",
              ]),
              te = e.cwrap("zappar_instant_world_tracker_enabled_set", null, [
                "number",
                "number",
              ]),
              re = e.cwrap("zappar_instant_world_tracker_enabled", "number", [
                "number",
              ]),
              ne = e.cwrap(
                "zappar_instant_world_tracker_anchor_pose_raw",
                "number",
                ["number"]
              ),
              ae = e.cwrap(
                "zappar_instant_world_tracker_anchor_pose_set_from_camera_offset",
                null,
                ["number", "number", "number", "number", "number"]
              ),
              ie = 32,
              oe = e._malloc(ie),
              se = 64,
              ue = e._malloc(se);
            return {
              log_level: () => t(),
              log_level_set: (e) => r(e),
              analytics_project_id_set: (e) => n(e),
              pipeline_create: () => a(),
              pipeline_destroy: () => {
                i();
              },
              pipeline_frame_update: (e) => o(e),
              pipeline_frame_number: (e) => s(e),
              pipeline_camera_model: (t) => {
                let r = u(t),
                  n = new Float32Array(6);
                return n.set(e.HEAPF32.subarray(r / 4, 6 + r / 4)), (r = n), r;
              },
              pipeline_camera_frame_user_data: (e) => _(e),
              pipeline_camera_frame_submit: (t, r, n, a, i, o) => {
                ie < r.byteLength &&
                  (e._free(oe), (ie = r.byteLength), (oe = e._malloc(ie)));
                let s = oe,
                  u = r.byteLength;
                e.HEAPU8.set(new Uint8Array(r), oe);
                let _ = n,
                  f = a,
                  l = i;
                se < o.byteLength &&
                  (e._free(se), (se = o.byteLength), (ue = e._malloc(se)));
                let p = ue;
                return e.HEAPF32.set(o, ue / 4), c(t, s, u, _, f, l, p);
              },
              pipeline_camera_frame_camera_attitude: (t) => {
                let r = f(t),
                  n = new Float32Array(16);
                return n.set(e.HEAPF32.subarray(r / 4, 16 + r / 4)), (r = n), r;
              },
              pipeline_motion_accelerometer_submit: (e, t, r, n, a) =>
                l(e, t, r, n, a),
              pipeline_motion_rotation_rate_submit: (e, t, r, n, a) =>
                p(e, t, r, n, a),
              pipeline_motion_attitude_submit: (e, t, r, n, a) =>
                h(e, t, r, n, a),
              camera_source_create: (e, t) => m(e, t),
              camera_source_destroy: () => {
                d();
              },
              image_tracker_create: (e) => b(e),
              image_tracker_destroy: () => {
                y();
              },
              image_tracker_target_load_from_memory: (t, r) => {
                ie < r.byteLength &&
                  (e._free(oe), (ie = r.byteLength), (oe = e._malloc(ie)));
                let n = oe,
                  a = r.byteLength;
                return e.HEAPU8.set(new Uint8Array(r), oe), v(t, n, a);
              },
              image_tracker_target_loaded_version: (e) => g(e),
              image_tracker_target_count: (e) => w(e),
              image_tracker_enabled: (e) => {
                let t = M(e);
                return (t = 1 === t), t;
              },
              image_tracker_enabled_set: (e, t) => k(e, t ? 1 : 0),
              image_tracker_anchor_count: (e) => z(e),
              image_tracker_anchor_id: (e, t) => A(e, t),
              image_tracker_anchor_pose_raw: (t, r) => {
                let n = x(t, r),
                  a = new Float32Array(16);
                return a.set(e.HEAPF32.subarray(n / 4, 16 + n / 4)), (n = a), n;
              },
              face_tracker_create: (e) => L(e),
              face_tracker_destroy: () => {
                E();
              },
              face_tracker_model_load_from_memory: (t, r) => {
                ie < r.byteLength &&
                  (e._free(oe), (ie = r.byteLength), (oe = e._malloc(ie)));
                let n = oe,
                  a = r.byteLength;
                return e.HEAPU8.set(new Uint8Array(r), oe), C(t, n, a);
              },
              face_tracker_model_loaded_version: (e) => O(e),
              face_tracker_enabled_set: (e, t) => S(e, t ? 1 : 0),
              face_tracker_enabled: (e) => {
                let t = T(e);
                return (t = 1 === t), t;
              },
              face_tracker_max_faces_set: (e, t) => P(e, t),
              face_tracker_max_faces: (e) => I(e),
              face_tracker_anchor_count: (e) => B(e),
              face_tracker_anchor_id: (e, t) => F(e, t),
              face_tracker_anchor_pose_raw: (t, r) => {
                let n = D(t, r),
                  a = new Float32Array(16);
                return a.set(e.HEAPF32.subarray(n / 4, 16 + n / 4)), (n = a), n;
              },
              face_tracker_anchor_identity_coefficients: (t, r) => {
                let n = j(t, r),
                  a = new Float32Array(50);
                return a.set(e.HEAPF32.subarray(n / 4, 50 + n / 4)), (n = a), n;
              },
              face_tracker_anchor_expression_coefficients: (t, r) => {
                let n = R(t, r),
                  a = new Float32Array(29);
                return a.set(e.HEAPF32.subarray(n / 4, 29 + n / 4)), (n = a), n;
              },
              face_mesh_create: () => V(),
              face_mesh_destroy: () => {
                q();
              },
              face_landmark_create: (e) => G(e),
              face_landmark_destroy: () => {
                N();
              },
              barcode_finder_create: (e) => U(e),
              barcode_finder_destroy: () => {
                W();
              },
              barcode_finder_enabled_set: (e, t) => H(e, t ? 1 : 0),
              barcode_finder_enabled: (e) => {
                let t = Z(e);
                return (t = 1 === t), t;
              },
              barcode_finder_found_number: (e) => Y(e),
              barcode_finder_found_text: (e, t) => X(e, t),
              barcode_finder_found_format: (e, t) => K(e, t),
              barcode_finder_formats: (e) => J(e),
              barcode_finder_formats_set: (e, t) => Q(e, t),
              instant_world_tracker_create: (e) => $(e),
              instant_world_tracker_destroy: () => {
                ee();
              },
              instant_world_tracker_enabled_set: (e, t) => te(e, t ? 1 : 0),
              instant_world_tracker_enabled: (e) => {
                let t = re(e);
                return (t = 1 === t), t;
              },
              instant_world_tracker_anchor_pose_raw: (t) => {
                let r = ne(t),
                  n = new Float32Array(16);
                return n.set(e.HEAPF32.subarray(r / 4, 16 + r / 4)), (r = n), r;
              },
              instant_world_tracker_anchor_pose_set_from_camera_offset: (
                e,
                t,
                r,
                n,
                a
              ) => ae(e, t, r, n, a),
            };
          });
      },
      34: (e, t, r) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.zappar_server = void 0);
        const n = r(476),
          a = r(810);
        t.zappar_server = class {
          constructor(e, t) {
            (this._impl = e),
              (this._sender = t),
              (this._deserializer = new a.MessageDeserializer()),
              (this.serializersByPipelineId = new Map()),
              (this._pipeline_id_by_pipeline_id = new Map()),
              (this._pipeline_by_instance = new Map()),
              (this._pipeline_id_by_camera_source_id = new Map()),
              (this._camera_source_by_instance = new Map()),
              (this._pipeline_id_by_image_tracker_id = new Map()),
              (this._image_tracker_by_instance = new Map()),
              (this._pipeline_id_by_face_tracker_id = new Map()),
              (this._face_tracker_by_instance = new Map()),
              (this._pipeline_id_by_face_mesh_id = new Map()),
              (this._face_mesh_by_instance = new Map()),
              (this._pipeline_id_by_face_landmark_id = new Map()),
              (this._face_landmark_by_instance = new Map()),
              (this._pipeline_id_by_barcode_finder_id = new Map()),
              (this._barcode_finder_by_instance = new Map()),
              (this._pipeline_id_by_instant_world_tracker_id = new Map()),
              (this._instant_world_tracker_by_instance = new Map());
          }
          processBuffer(e) {
            this._deserializer.setData(e),
              this._deserializer.forMessages((e, t) => {
                switch (e) {
                  case 33:
                    this._impl.log_level_set(t.logLevel());
                    break;
                  case 30:
                    this._impl.analytics_project_id_set(t.string());
                    break;
                  case 26: {
                    let e = t.type(),
                      r = this._impl.pipeline_create();
                    this._pipeline_by_instance.set(e, r),
                      this._pipeline_id_by_pipeline_id.set(e, e),
                      this.serializersByPipelineId.set(
                        e,
                        new n.MessageSerializer((t) => {
                          this._sender(e, t);
                        })
                      );
                    break;
                  }
                  case 27: {
                    let e = t.type(),
                      r = this._pipeline_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.pipeline_destroy(r),
                      this._pipeline_by_instance.delete(e);
                    break;
                  }
                  case 9: {
                    let e = t.type(),
                      r = this._pipeline_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.pipeline_frame_update(r);
                    break;
                  }
                  case 8: {
                    let e = t.type(),
                      r = this._pipeline_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.pipeline_camera_frame_submit(
                      r,
                      t.dataWithLength(),
                      t.int(),
                      t.int(),
                      t.int(),
                      t.matrix4x4()
                    );
                    break;
                  }
                  case 10: {
                    let e = t.type(),
                      r = this._pipeline_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.pipeline_motion_accelerometer_submit(
                      r,
                      t.timestamp(),
                      t.float(),
                      t.float(),
                      t.float()
                    );
                    break;
                  }
                  case 11: {
                    let e = t.type(),
                      r = this._pipeline_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.pipeline_motion_rotation_rate_submit(
                      r,
                      t.timestamp(),
                      t.float(),
                      t.float(),
                      t.float()
                    );
                    break;
                  }
                  case 12: {
                    let e = t.type(),
                      r = this._pipeline_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.pipeline_motion_attitude_submit(
                      r,
                      t.timestamp(),
                      t.float(),
                      t.float(),
                      t.float()
                    );
                    break;
                  }
                  case 28: {
                    let e = t.type(),
                      r = t.type(),
                      n = this._pipeline_by_instance.get(r),
                      a = t.string(),
                      i = this._impl.camera_source_create(n, a);
                    this._camera_source_by_instance.set(e, i),
                      this._pipeline_id_by_camera_source_id.set(e, r);
                    break;
                  }
                  case 29: {
                    let e = t.type(),
                      r = this._camera_source_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.camera_source_destroy(r),
                      this._camera_source_by_instance.delete(e);
                    break;
                  }
                  case 2: {
                    let e = t.type(),
                      r = t.type(),
                      n = this._pipeline_by_instance.get(r),
                      a = this._impl.image_tracker_create(n);
                    this._image_tracker_by_instance.set(e, a),
                      this._pipeline_id_by_image_tracker_id.set(e, r);
                    break;
                  }
                  case 13: {
                    let e = t.type(),
                      r = this._image_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.image_tracker_destroy(r),
                      this._image_tracker_by_instance.delete(e);
                    break;
                  }
                  case 4: {
                    let e = t.type(),
                      r = this._image_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.image_tracker_target_load_from_memory(
                      r,
                      t.dataWithLength()
                    );
                    break;
                  }
                  case 3: {
                    let e = t.type(),
                      r = this._image_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.image_tracker_enabled_set(r, t.bool());
                    break;
                  }
                  case 19: {
                    let e = t.type(),
                      r = t.type(),
                      n = this._pipeline_by_instance.get(r),
                      a = this._impl.face_tracker_create(n);
                    this._face_tracker_by_instance.set(e, a),
                      this._pipeline_id_by_face_tracker_id.set(e, r);
                    break;
                  }
                  case 20: {
                    let e = t.type(),
                      r = this._face_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.face_tracker_destroy(r),
                      this._face_tracker_by_instance.delete(e);
                    break;
                  }
                  case 21: {
                    let e = t.type(),
                      r = this._face_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.face_tracker_model_load_from_memory(
                      r,
                      t.dataWithLength()
                    );
                    break;
                  }
                  case 22: {
                    let e = t.type(),
                      r = this._face_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.face_tracker_enabled_set(r, t.bool());
                    break;
                  }
                  case 23: {
                    let e = t.type(),
                      r = this._face_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.face_tracker_max_faces_set(r, t.int());
                    break;
                  }
                  case 24: {
                    let e = t.type(),
                      r = this._impl.face_mesh_create();
                    this._face_mesh_by_instance.set(e, r);
                    break;
                  }
                  case 25: {
                    let e = t.type(),
                      r = this._face_mesh_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.face_mesh_destroy(r),
                      this._face_mesh_by_instance.delete(e);
                    break;
                  }
                  case 31: {
                    let e = t.type(),
                      r = t.faceLandmarkName(),
                      n = this._impl.face_landmark_create(r);
                    this._face_landmark_by_instance.set(e, n);
                    break;
                  }
                  case 32: {
                    let e = t.type(),
                      r = this._face_landmark_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.face_landmark_destroy(r),
                      this._face_landmark_by_instance.delete(e);
                    break;
                  }
                  case 15: {
                    let e = t.type(),
                      r = t.type(),
                      n = this._pipeline_by_instance.get(r),
                      a = this._impl.barcode_finder_create(n);
                    this._barcode_finder_by_instance.set(e, a),
                      this._pipeline_id_by_barcode_finder_id.set(e, r);
                    break;
                  }
                  case 16: {
                    let e = t.type(),
                      r = this._barcode_finder_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.barcode_finder_destroy(r),
                      this._barcode_finder_by_instance.delete(e);
                    break;
                  }
                  case 17: {
                    let e = t.type(),
                      r = this._barcode_finder_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.barcode_finder_enabled_set(r, t.bool());
                    break;
                  }
                  case 18: {
                    let e = t.type(),
                      r = this._barcode_finder_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.barcode_finder_formats_set(r, t.barcodeFormat());
                    break;
                  }
                  case 5: {
                    let e = t.type(),
                      r = t.type(),
                      n = this._pipeline_by_instance.get(r),
                      a = this._impl.instant_world_tracker_create(n);
                    this._instant_world_tracker_by_instance.set(e, a),
                      this._pipeline_id_by_instant_world_tracker_id.set(e, r);
                    break;
                  }
                  case 14: {
                    let e = t.type(),
                      r = this._instant_world_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.instant_world_tracker_destroy(r),
                      this._instant_world_tracker_by_instance.delete(e);
                    break;
                  }
                  case 6: {
                    let e = t.type(),
                      r = this._instant_world_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.instant_world_tracker_enabled_set(r, t.bool());
                    break;
                  }
                  case 7: {
                    let e = t.type(),
                      r = this._instant_world_tracker_by_instance.get(e);
                    if (void 0 === r) return;
                    this._impl.instant_world_tracker_anchor_pose_set_from_camera_offset(
                      r,
                      t.float(),
                      t.float(),
                      t.float(),
                      t.instantTrackerTransformOrientation()
                    );
                    break;
                  }
                }
              });
          }
          exploreState() {
            for (let [e, t] of this._pipeline_by_instance) {
              let r = this._pipeline_id_by_pipeline_id.get(e);
              if (!r) continue;
              let n = this.serializersByPipelineId.get(r);
              n &&
                (n.sendMessage(7, (r) => {
                  r.type(e), r.int(this._impl.pipeline_frame_number(t));
                }),
                n.sendMessage(6, (r) => {
                  r.type(e), r.cameraModel(this._impl.pipeline_camera_model(t));
                }),
                n.sendMessage(5, (r) => {
                  r.type(e),
                    r.int(this._impl.pipeline_camera_frame_user_data(t));
                }),
                n.sendMessage(11, (r) => {
                  r.type(e),
                    r.matrix4x4(
                      this._impl.pipeline_camera_frame_camera_attitude(t)
                    );
                }));
            }
            for (let [e, t] of this._camera_source_by_instance) {
              let t = this._pipeline_id_by_camera_source_id.get(e);
              t && this.serializersByPipelineId.get(t);
            }
            for (let [e, t] of this._image_tracker_by_instance) {
              let r = this._pipeline_id_by_image_tracker_id.get(e);
              if (!r) continue;
              let n = this.serializersByPipelineId.get(r);
              if (n) {
                n.sendMessage(18, (r) => {
                  r.type(e),
                    r.int(this._impl.image_tracker_target_loaded_version(t));
                }),
                  n.sendMessage(20, (r) => {
                    r.type(e), r.int(this._impl.image_tracker_target_count(t));
                  }),
                  n.sendMessage(1, (r) => {
                    r.type(e), r.int(this._impl.image_tracker_anchor_count(t));
                  });
                for (
                  let r = 0;
                  r < this._impl.image_tracker_anchor_count(t);
                  r++
                )
                  n.sendMessage(2, (n) => {
                    n.type(e),
                      n.int(r),
                      n.string(this._impl.image_tracker_anchor_id(t, r));
                  });
                for (
                  let r = 0;
                  r < this._impl.image_tracker_anchor_count(t);
                  r++
                )
                  n.sendMessage(3, (n) => {
                    n.type(e),
                      n.int(r),
                      n.matrix4x4(
                        this._impl.image_tracker_anchor_pose_raw(t, r)
                      );
                  });
              }
            }
            for (let [e, t] of this._face_tracker_by_instance) {
              let r = this._pipeline_id_by_face_tracker_id.get(e);
              if (!r) continue;
              let n = this.serializersByPipelineId.get(r);
              if (n) {
                n.sendMessage(17, (r) => {
                  r.type(e),
                    r.int(this._impl.face_tracker_model_loaded_version(t));
                }),
                  n.sendMessage(12, (r) => {
                    r.type(e), r.int(this._impl.face_tracker_anchor_count(t));
                  });
                for (
                  let r = 0;
                  r < this._impl.face_tracker_anchor_count(t);
                  r++
                )
                  n.sendMessage(13, (n) => {
                    n.type(e),
                      n.int(r),
                      n.string(this._impl.face_tracker_anchor_id(t, r));
                  });
                for (
                  let r = 0;
                  r < this._impl.face_tracker_anchor_count(t);
                  r++
                )
                  n.sendMessage(14, (n) => {
                    n.type(e),
                      n.int(r),
                      n.matrix4x4(
                        this._impl.face_tracker_anchor_pose_raw(t, r)
                      );
                  });
                for (
                  let r = 0;
                  r < this._impl.face_tracker_anchor_count(t);
                  r++
                )
                  n.sendMessage(15, (n) => {
                    n.type(e),
                      n.int(r),
                      n.identityCoefficients(
                        this._impl.face_tracker_anchor_identity_coefficients(
                          t,
                          r
                        )
                      );
                  });
                for (
                  let r = 0;
                  r < this._impl.face_tracker_anchor_count(t);
                  r++
                )
                  n.sendMessage(16, (n) => {
                    n.type(e),
                      n.int(r),
                      n.expressionCoefficients(
                        this._impl.face_tracker_anchor_expression_coefficients(
                          t,
                          r
                        )
                      );
                  });
              }
            }
            for (let [e, t] of this._face_mesh_by_instance) {
              let t = this._pipeline_id_by_face_mesh_id.get(e);
              t && this.serializersByPipelineId.get(t);
            }
            for (let [e, t] of this._face_landmark_by_instance) {
              let t = this._pipeline_id_by_face_landmark_id.get(e);
              t && this.serializersByPipelineId.get(t);
            }
            for (let [e, t] of this._barcode_finder_by_instance) {
              let r = this._pipeline_id_by_barcode_finder_id.get(e);
              if (!r) continue;
              let n = this.serializersByPipelineId.get(r);
              if (n) {
                n.sendMessage(8, (r) => {
                  r.type(e), r.int(this._impl.barcode_finder_found_number(t));
                });
                for (
                  let r = 0;
                  r < this._impl.barcode_finder_found_number(t);
                  r++
                )
                  n.sendMessage(9, (n) => {
                    n.type(e),
                      n.int(r),
                      n.string(this._impl.barcode_finder_found_text(t, r));
                  });
                for (
                  let r = 0;
                  r < this._impl.barcode_finder_found_number(t);
                  r++
                )
                  n.sendMessage(10, (n) => {
                    n.type(e),
                      n.int(r),
                      n.barcodeFormat(
                        this._impl.barcode_finder_found_format(t, r)
                      );
                  });
              }
            }
            for (let [e, t] of this._instant_world_tracker_by_instance) {
              let r = this._pipeline_id_by_instant_world_tracker_id.get(e);
              if (!r) continue;
              let n = this.serializersByPipelineId.get(r);
              n &&
                n.sendMessage(4, (r) => {
                  r.type(e),
                    r.matrix4x4(
                      this._impl.instant_world_tracker_anchor_pose_raw(t)
                    );
                });
            }
          }
        };
      },
      123: (e, t, r) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.MsgManager = void 0);
        const n = r(435);
        t.MsgManager = class {
          constructor() {
            (this.onOutgoingMessage = new n.Event()),
              (this.onIncomingMessage = new n.Event1()),
              (this._outgoingMessages = []);
          }
          postIncomingMessage(e) {
            this.onIncomingMessage.emit(e);
          }
          postOutgoingMessage(e, t) {
            this._outgoingMessages.push({ msg: e, transferables: t }),
              this.onOutgoingMessage.emit();
          }
          getOutgoingMessages() {
            let e = this._outgoingMessages;
            return (this._outgoingMessages = []), e;
          }
        };
      },
      476: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.MessageSerializer = void 0),
          (t.MessageSerializer = class {
            constructor(e) {
              (this._messageSender = e),
                (this._freeBufferPool = []),
                (this._buffer = new ArrayBuffer(16)),
                (this._i32View = new Int32Array(this._buffer)),
                (this._f32View = new Float32Array(this._buffer)),
                (this._f64View = new Float64Array(this._buffer)),
                (this._u8View = new Uint8Array(this._buffer)),
                (this._u8cView = new Uint8ClampedArray(this._buffer)),
                (this._u16View = new Uint16Array(this._buffer)),
                (this._u32View = new Uint32Array(this._buffer)),
                (this._offset = 1),
                (this._startOffset = -1),
                (this._timeoutSet = !1),
                (this._appender = {
                  int: (e) => this.int(e),
                  bool: (e) => this.int(e ? 1 : 0),
                  float: (e) => this.float(e),
                  string: (e) => this.string(e),
                  dataWithLength: (e) => this.arrayBuffer(e),
                  type: (e) => this.int(e),
                  matrix4x4: (e) => this.float32ArrayBuffer(e),
                  identityCoefficients: (e) => this.float32ArrayBuffer(e),
                  expressionCoefficients: (e) => this.float32ArrayBuffer(e),
                  cameraModel: (e) => this.float32ArrayBuffer(e),
                  timestamp: (e) => this.double(e),
                  barcodeFormat: (e) => this.int(e),
                  faceLandmarkName: (e) => this.int(e),
                  instantTrackerTransformOrientation: (e) => this.int(e),
                  logLevel: (e) => this.int(e),
                }),
                this._freeBufferPool.push(new ArrayBuffer(16)),
                this._freeBufferPool.push(new ArrayBuffer(16));
            }
            bufferReturn(e) {
              this._freeBufferPool.push(e);
            }
            _ensureArrayBuffer(e) {
              let t,
                r = 4 * (this._offset + e + 8);
              if (this._buffer && this._buffer.byteLength >= r) return;
              if (!t) {
                let e = r;
                e--,
                  (e |= e >> 1),
                  (e |= e >> 2),
                  (e |= e >> 4),
                  (e |= e >> 8),
                  (e |= e >> 16),
                  e++,
                  (t = new ArrayBuffer(e));
              }
              let n = this._buffer ? this._i32View : void 0;
              (this._buffer = t),
                (this._i32View = new Int32Array(this._buffer)),
                (this._f32View = new Float32Array(this._buffer)),
                (this._f64View = new Float64Array(this._buffer)),
                (this._u8View = new Uint8Array(this._buffer)),
                (this._u8cView = new Uint8ClampedArray(this._buffer)),
                (this._u16View = new Uint16Array(this._buffer)),
                (this._u32View = new Uint32Array(this._buffer)),
                n && this._i32View.set(n.subarray(0, this._offset));
            }
            sendMessage(e, t) {
              this._ensureArrayBuffer(4),
                (this._startOffset = this._offset),
                (this._i32View[this._offset + 1] = e),
                (this._offset += 2),
                t(this._appender),
                (this._i32View[this._startOffset] =
                  this._offset - this._startOffset),
                (this._startOffset = -1),
                this._sendOneTime();
            }
            _sendOneTime() {
              !1 === this._timeoutSet &&
                ((this._timeoutSet = !0),
                setTimeout(() => {
                  (this._timeoutSet = !1), this._send();
                }, 0));
            }
            _send() {
              0 !== this._freeBufferPool.length
                ? ((this._i32View[0] = this._offset),
                  this._messageSender(this._buffer),
                  (this._buffer = void 0),
                  (this._buffer = this._freeBufferPool.pop()),
                  (this._i32View = new Int32Array(this._buffer)),
                  (this._f32View = new Float32Array(this._buffer)),
                  (this._f64View = new Float64Array(this._buffer)),
                  (this._u8View = new Uint8Array(this._buffer)),
                  (this._u8cView = new Uint8ClampedArray(this._buffer)),
                  (this._u16View = new Uint16Array(this._buffer)),
                  (this._u32View = new Uint32Array(this._buffer)),
                  (this._offset = 1),
                  (this._startOffset = -1))
                : this._sendOneTime();
            }
            int(e) {
              this._ensureArrayBuffer(1),
                (this._i32View[this._offset] = e),
                this._offset++;
            }
            double(e) {
              this._ensureArrayBuffer(2),
                this._offset % 2 == 1 && this._offset++,
                (this._f64View[this._offset / 2] = e),
                (this._offset += 2);
            }
            float(e) {
              this._ensureArrayBuffer(1),
                (this._f32View[this._offset] = e),
                this._offset++;
            }
            int32Array(e) {
              this._ensureArrayBuffer(e.length);
              for (let t = 0; t < e.length; ++t)
                this._i32View[this._offset + t] = e[t];
              this._offset += e.length;
            }
            float32Array(e) {
              this._ensureArrayBuffer(e.length);
              for (let t = 0; t < e.length; ++t)
                this._f32View[this._offset + t] = e[t];
              this._offset += e.length;
            }
            booleanArray(e) {
              this._ensureArrayBuffer(e.length);
              for (let t = 0; t < e.length; ++t)
                this._i32View[this._offset + t] = e[t] ? 1 : 0;
              this._offset += e.length;
            }
            uint8ArrayBuffer(e) {
              this._ensureArrayBuffer(e.byteLength / 4),
                (this._i32View[this._offset] = e.byteLength),
                this._offset++,
                this._u8View.set(e, 4 * this._offset),
                (this._offset += e.byteLength >> 2),
                0 != (3 & e.byteLength) && this._offset++;
            }
            arrayBuffer(e) {
              let t = new Uint8Array(e);
              this.uint8ArrayBuffer(t);
            }
            uint8ClampedArrayBuffer(e) {
              this._ensureArrayBuffer(e.byteLength / 4),
                (this._i32View[this._offset] = e.byteLength),
                this._offset++,
                this._u8cView.set(e, 4 * this._offset),
                (this._offset += e.byteLength >> 2),
                0 != (3 & e.byteLength) && this._offset++;
            }
            float32ArrayBuffer(e) {
              this._ensureArrayBuffer(e.byteLength / 4),
                (this._i32View[this._offset] = e.length),
                this._offset++,
                this._f32View.set(e, this._offset),
                (this._offset += e.length);
            }
            uint16ArrayBuffer(e) {
              this._ensureArrayBuffer(e.byteLength / 4),
                (this._i32View[this._offset] = e.length),
                this._offset++;
              let t = 2 * this._offset;
              this._u16View.set(e, t),
                (this._offset += e.length >> 1),
                0 != (1 & e.length) && this._offset++;
            }
            int32ArrayBuffer(e) {
              this._ensureArrayBuffer(e.byteLength / 4),
                (this._i32View[this._offset] = e.length),
                this._offset++,
                this._i32View.set(e, this._offset),
                (this._offset += e.length);
            }
            uint32ArrayBuffer(e) {
              this._ensureArrayBuffer(e.byteLength / 4),
                (this._i32View[this._offset] = e.length),
                this._offset++,
                this._u32View.set(e, this._offset),
                (this._offset += e.length);
            }
            string(e) {
              let t = new TextEncoder().encode(e);
              this._ensureArrayBuffer(t.byteLength / 4),
                (this._i32View[this._offset] = t.byteLength),
                this._offset++,
                this._u8View.set(t, 4 * this._offset),
                (this._offset += t.byteLength >> 2),
                0 != (3 & t.byteLength) && this._offset++;
            }
          });
      },
      248: function (e, t, r) {
        var n =
          (this && this.__awaiter) ||
          function (e, t, r, n) {
            return new (r || (r = Promise))(function (a, i) {
              function o(e) {
                try {
                  u(n.next(e));
                } catch (e) {
                  i(e);
                }
              }
              function s(e) {
                try {
                  u(n.throw(e));
                } catch (e) {
                  i(e);
                }
              }
              function u(e) {
                var t;
                e.done
                  ? a(e.value)
                  : ((t = e.value),
                    t instanceof r
                      ? t
                      : new r(function (e) {
                          e(t);
                        })).then(o, s);
              }
              u((n = n.apply(e, t || [])).next());
            });
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.launchWorkerServer = t.messageManager = void 0);
        const a = r(206),
          i = r(346),
          o = r(34),
          s = r(123),
          u = r(887);
        (t.messageManager = new s.MsgManager()),
          (t.launchWorkerServer = function (e) {
            return n(this, void 0, void 0, function* () {
              let r = a.default({
                locateFile: (t, r) => (t.endsWith("zcv.wasm") ? e : r + t),
                onRuntimeInitialized: () => {
                  let e = i.getRuntimeObject(r),
                    n = new o.zappar_server(e, (e, r) => {
                      t.messageManager.postOutgoingMessage(
                        { p: e, t: "zappar", d: r },
                        [r]
                      );
                    });
                  t.messageManager.postOutgoingMessage("loaded", []),
                    t.messageManager.onIncomingMessage.bind((r) => {
                      var a;
                      switch (r.t) {
                        case "zappar":
                          n.processBuffer(r.d),
                            t.messageManager.postOutgoingMessage(
                              { t: "buf", d: r.d },
                              [r.d]
                            );
                          break;
                        case "buf":
                          null === (a = n.serializersByPipelineId.get(r.p)) ||
                            void 0 === a ||
                            a.bufferReturn(r.d);
                          break;
                        case "cameraFrameC2S":
                          let i = r,
                            o = u.mat4.create();
                          i.userFacing && u.mat4.fromScaling(o, [-1, 1, -1]);
                          let s = n._pipeline_by_instance.get(i.p);
                          s &&
                            (e.pipeline_camera_frame_submit(
                              s,
                              i.d,
                              i.width,
                              i.height,
                              i.token,
                              o
                            ),
                            e.pipeline_frame_update(s),
                            n.exploreState());
                          let _ = {
                            token: i.token,
                            d: i.d,
                            p: i.p,
                            t: "cameraFrameRecycleS2C",
                          };
                          t.messageManager.postOutgoingMessage(_, [i.d]);
                      }
                    });
                },
              });
            });
          });
      },
      206: (e, t, r) => {
        var n;
        r.r(t), r.d(t, { default: () => a });
        const a =
          ((n =
            "undefined" != typeof document && document.currentScript
              ? document.currentScript.src
              : void 0),
          function (e) {
            var t;
            (e = e || {}), t || (t = void 0 !== e ? e : {});
            var r,
              a = {};
            for (r in t) t.hasOwnProperty(r) && (a[r] = t[r]);
            (t.arguments = []),
              (t.thisProgram = "./this.program"),
              (t.quit = function (e, t) {
                throw t;
              }),
              (t.preRun = []),
              (t.postRun = []);
            var i = "";
            function o(e) {
              return t.locateFile ? t.locateFile(e, i) : i + e;
            }
            (i = self.location.href),
              n && (i = n),
              (i =
                0 !== i.indexOf("blob:")
                  ? i.substr(0, i.lastIndexOf("/") + 1)
                  : ""),
              (t.read = function (e) {
                var t = new XMLHttpRequest();
                return t.open("GET", e, !1), t.send(null), t.responseText;
              }),
              (t.readBinary = function (e) {
                var t = new XMLHttpRequest();
                return (
                  t.open("GET", e, !1),
                  (t.responseType = "arraybuffer"),
                  t.send(null),
                  new Uint8Array(t.response)
                );
              }),
              (t.readAsync = function (e, t, r) {
                var n = new XMLHttpRequest();
                n.open("GET", e, !0),
                  (n.responseType = "arraybuffer"),
                  (n.onload = function () {
                    200 == n.status || (0 == n.status && n.response)
                      ? t(n.response)
                      : r();
                  }),
                  (n.onerror = r),
                  n.send(null);
              }),
              (t.setWindowTitle = function (e) {
                document.title = e;
              });
            var s =
                t.print ||
                ("undefined" != typeof console
                  ? console.log.bind(console)
                  : "undefined" != typeof print
                  ? print
                  : null),
              u =
                t.printErr ||
                ("undefined" != typeof printErr
                  ? printErr
                  : ("undefined" != typeof console &&
                      console.warn.bind(console)) ||
                    s);
            for (r in a) a.hasOwnProperty(r) && (t[r] = a[r]);
            function _(e) {
              var t = B;
              return (B = (B + e + 15) & -16), t;
            }
            function c(e) {
              var t = S[V >> 2];
              return (
                (e = (t + e + 15) & -16),
                (S[V >> 2] = e),
                e >= Z && !W() ? ((S[V >> 2] = t), 0) : t
              );
            }
            function f(e) {
              var t;
              return t || (t = 16), Math.ceil(e / t) * t;
            }
            a = void 0;
            var l,
              p = {
                "f64-rem": function (e, t) {
                  return e % t;
                },
                debugger: function () {},
              },
              h = {};
            var m = !1;
            function d(e, t) {
              e || yn("Assertion failed: " + t);
            }
            function b(e) {
              var r = t["_" + e];
              return (
                d(
                  r,
                  "Cannot call unknown function " +
                    e +
                    ", make sure it is exported"
                ),
                r
              );
            }
            var y = {
                stackSave: function () {
                  dn();
                },
                stackRestore: function () {
                  mn();
                },
                arrayToC: function (e) {
                  var t = hn(e.length);
                  return L.set(e, t), t;
                },
                stringToC: function (e) {
                  var t = 0;
                  if (null != e && 0 !== e) {
                    var r = 1 + (e.length << 2);
                    (t = hn(r)), z(e, E, t, r);
                  }
                  return t;
                },
              },
              v = { string: y.stringToC, array: y.arrayToC };
            function g(e) {
              var t;
              if (0 === t || !e) return "";
              for (
                var r, n = 0, a = 0;
                (n |= r = E[(e + a) >> 0]),
                  (0 != r || t) && (a++, !t || a != t);

              );
              if ((t || (t = a), (r = ""), 128 > n)) {
                for (; 0 < t; )
                  (n = String.fromCharCode.apply(
                    String,
                    E.subarray(e, e + Math.min(t, 1024))
                  )),
                    (r = r ? r + n : n),
                    (e += 1024),
                    (t -= 1024);
                return r;
              }
              return k(e);
            }
            var w =
              "undefined" != typeof TextDecoder
                ? new TextDecoder("utf8")
                : void 0;
            function M(e, t) {
              for (var r = t; e[r]; ) ++r;
              if (16 < r - t && e.subarray && w)
                return w.decode(e.subarray(t, r));
              for (r = ""; ; ) {
                var n = e[t++];
                if (!n) return r;
                if (128 & n) {
                  var a = 63 & e[t++];
                  if (192 == (224 & n))
                    r += String.fromCharCode(((31 & n) << 6) | a);
                  else {
                    var i = 63 & e[t++];
                    if (224 == (240 & n)) n = ((15 & n) << 12) | (a << 6) | i;
                    else {
                      var o = 63 & e[t++];
                      if (240 == (248 & n))
                        n = ((7 & n) << 18) | (a << 12) | (i << 6) | o;
                      else {
                        var s = 63 & e[t++];
                        n =
                          248 == (252 & n)
                            ? ((3 & n) << 24) |
                              (a << 18) |
                              (i << 12) |
                              (o << 6) |
                              s
                            : ((1 & n) << 30) |
                              (a << 24) |
                              (i << 18) |
                              (o << 12) |
                              (s << 6) |
                              (63 & e[t++]);
                      }
                    }
                    65536 > n
                      ? (r += String.fromCharCode(n))
                      : ((n -= 65536),
                        (r += String.fromCharCode(
                          55296 | (n >> 10),
                          56320 | (1023 & n)
                        )));
                  }
                } else r += String.fromCharCode(n);
              }
            }
            function k(e) {
              return M(E, e);
            }
            function z(e, t, r, n) {
              if (!(0 < n)) return 0;
              var a = r;
              n = r + n - 1;
              for (var i = 0; i < e.length; ++i) {
                var o = e.charCodeAt(i);
                if (
                  (55296 <= o &&
                    57343 >= o &&
                    (o =
                      (65536 + ((1023 & o) << 10)) |
                      (1023 & e.charCodeAt(++i))),
                  127 >= o)
                ) {
                  if (r >= n) break;
                  t[r++] = o;
                } else {
                  if (2047 >= o) {
                    if (r + 1 >= n) break;
                    t[r++] = 192 | (o >> 6);
                  } else {
                    if (65535 >= o) {
                      if (r + 2 >= n) break;
                      t[r++] = 224 | (o >> 12);
                    } else {
                      if (2097151 >= o) {
                        if (r + 3 >= n) break;
                        t[r++] = 240 | (o >> 18);
                      } else {
                        if (67108863 >= o) {
                          if (r + 4 >= n) break;
                          t[r++] = 248 | (o >> 24);
                        } else {
                          if (r + 5 >= n) break;
                          (t[r++] = 252 | (o >> 30)),
                            (t[r++] = 128 | ((o >> 24) & 63));
                        }
                        t[r++] = 128 | ((o >> 18) & 63);
                      }
                      t[r++] = 128 | ((o >> 12) & 63);
                    }
                    t[r++] = 128 | ((o >> 6) & 63);
                  }
                  t[r++] = 128 | (63 & o);
                }
              }
              return (t[r] = 0), r - a;
            }
            function A(e) {
              for (var t = 0, r = 0; r < e.length; ++r) {
                var n = e.charCodeAt(r);
                55296 <= n &&
                  57343 >= n &&
                  (n =
                    (65536 + ((1023 & n) << 10)) | (1023 & e.charCodeAt(++r))),
                  127 >= n
                    ? ++t
                    : (t =
                        2047 >= n
                          ? t + 2
                          : 65535 >= n
                          ? t + 3
                          : 2097151 >= n
                          ? t + 4
                          : 67108863 >= n
                          ? t + 5
                          : t + 6);
              }
              return t;
            }
            "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
            var x,
              L,
              E,
              C,
              O,
              S,
              T,
              P,
              I,
              B,
              F,
              D,
              j,
              R,
              V,
              q = 65536,
              G = 16777216;
            function N(e, t) {
              return 0 < e % t && (e += t - (e % t)), e;
            }
            function U() {
              (t.HEAP8 = L = new Int8Array(x)),
                (t.HEAP16 = C = new Int16Array(x)),
                (t.HEAP32 = S = new Int32Array(x)),
                (t.HEAPU8 = E = new Uint8Array(x)),
                (t.HEAPU16 = O = new Uint16Array(x)),
                (t.HEAPU32 = T = new Uint32Array(x)),
                (t.HEAPF32 = P = new Float32Array(x)),
                (t.HEAPF64 = I = new Float64Array(x));
            }
            function W() {
              var e = t.usingWasm ? q : G,
                r = 2147483648 - e;
              if (S[V >> 2] > r) return !1;
              var n = Z;
              for (Z = Math.max(Z, 16777216); Z < S[V >> 2]; )
                Z =
                  536870912 >= Z
                    ? N(2 * Z, e)
                    : Math.min(N((3 * Z + 2147483648) / 4, e), r);
              return (e = t.reallocBuffer(Z)) && e.byteLength == Z
                ? ((t.buffer = x = e), U(), !0)
                : ((Z = n), !1);
            }
            (B = V = 0),
              t.reallocBuffer ||
                (t.reallocBuffer = function (e) {
                  try {
                    var t = L,
                      r = new ArrayBuffer(e);
                    new Int8Array(r).set(t);
                  } catch (e) {
                    return !1;
                  }
                  return !!cn(r) && r;
                });
            try {
              Function.prototype.call.bind(
                Object.getOwnPropertyDescriptor(
                  ArrayBuffer.prototype,
                  "byteLength"
                ).get
              )(new ArrayBuffer(4));
            } catch (Tr) {}
            var H = t.TOTAL_STACK || 5242880,
              Z = t.TOTAL_MEMORY || 16777216;
            function Y(e) {
              for (; 0 < e.length; ) {
                var r = e.shift();
                if ("function" == typeof r) r();
                else {
                  var n = r.g;
                  "number" == typeof n
                    ? void 0 === r.P
                      ? t.dynCall_v(n)
                      : t.dynCall_vi(n, r.P)
                    : n(void 0 === r.P ? null : r.P);
                }
              }
            }
            Z < H &&
              u(
                "TOTAL_MEMORY should be larger than TOTAL_STACK, was " +
                  Z +
                  "! (TOTAL_STACK=" +
                  H +
                  ")"
              ),
              t.buffer
                ? (x = t.buffer)
                : ("object" == typeof WebAssembly &&
                  "function" == typeof WebAssembly.Memory
                    ? ((t.wasmMemory = new WebAssembly.Memory({
                        initial: Z / q,
                      })),
                      (x = t.wasmMemory.buffer))
                    : (x = new ArrayBuffer(Z)),
                  (t.buffer = x)),
              U();
            var X = [],
              K = [],
              J = [],
              Q = [],
              $ = [],
              ee = !1;
            function te() {
              var e = t.preRun.shift();
              X.unshift(e);
            }
            var re = Math.abs,
              ne = Math.ceil,
              ae = Math.floor,
              ie = Math.min,
              oe = 0,
              se = null,
              ue = null;
            function _e() {
              oe++, t.monitorRunDependencies && t.monitorRunDependencies(oe);
            }
            function ce() {
              if (
                (oe--,
                t.monitorRunDependencies && t.monitorRunDependencies(oe),
                0 == oe &&
                  (null !== se && (clearInterval(se), (se = null)), ue))
              ) {
                var e = ue;
                (ue = null), e();
              }
            }
            function fe(e) {
              return String.prototype.startsWith
                ? e.startsWith("data:application/octet-stream;base64,")
                : 0 === e.indexOf("data:application/octet-stream;base64,");
            }
            (t.preloadedImages = {}),
              (t.preloadedAudios = {}),
              (function () {
                function e() {
                  try {
                    if (t.wasmBinary) return new Uint8Array(t.wasmBinary);
                    if (t.readBinary) return t.readBinary(i);
                    throw "both async and sync fetching of the wasm failed";
                  } catch (e) {
                    yn(e);
                  }
                }
                function r() {
                  return t.wasmBinary || "function" != typeof fetch
                    ? new Promise(function (t) {
                        t(e());
                      })
                    : fetch(i, { credentials: "same-origin" })
                        .then(function (e) {
                          if (!e.ok)
                            throw (
                              "failed to load wasm binary file at '" + i + "'"
                            );
                          return e.arrayBuffer();
                        })
                        .catch(function () {
                          return e();
                        });
                }
                function n(e) {
                  function n(e) {
                    if ((c = e.exports).memory) {
                      e = c.memory;
                      var r = t.buffer;
                      e.byteLength < r.byteLength &&
                        u(
                          "the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here"
                        ),
                        (r = new Int8Array(r)),
                        new Int8Array(e).set(r),
                        (t.buffer = x = e),
                        U();
                    }
                    (t.asm = c), (t.usingWasm = !0), ce();
                  }
                  function a(e) {
                    n(e.instance);
                  }
                  function o(e) {
                    r()
                      .then(function (e) {
                        return WebAssembly.instantiate(e, _);
                      })
                      .then(e, function (e) {
                        u("failed to asynchronously prepare wasm: " + e), yn(e);
                      });
                  }
                  if ("object" != typeof WebAssembly)
                    return u("no native wasm support detected"), !1;
                  if (!(t.wasmMemory instanceof WebAssembly.Memory))
                    return u("no native wasm Memory in use"), !1;
                  if (
                    ((e.memory = t.wasmMemory),
                    (_.global = { NaN: NaN, Infinity: 1 / 0 }),
                    (_["global.Math"] = Math),
                    (_.env = e),
                    _e(),
                    t.instantiateWasm)
                  )
                    try {
                      return t.instantiateWasm(_, n);
                    } catch (e) {
                      return (
                        u(
                          "Module.instantiateWasm callback failed with error: " +
                            e
                        ),
                        !1
                      );
                    }
                  return (
                    t.wasmBinary ||
                    "function" != typeof WebAssembly.instantiateStreaming ||
                    fe(i) ||
                    "function" != typeof fetch
                      ? o(a)
                      : WebAssembly.instantiateStreaming(
                          fetch(i, { credentials: "same-origin" }),
                          _
                        ).then(a, function (e) {
                          u("wasm streaming compile failed: " + e),
                            u("falling back to ArrayBuffer instantiation"),
                            o(a);
                        }),
                    {}
                  );
                }
                var a = "zcv.wast",
                  i = "zcv.wasm",
                  s = "zcv.temp.asm.js";
                fe(a) || (a = o(a)), fe(i) || (i = o(i)), fe(s) || (s = o(s));
                var _ = { global: null, env: null, asm2wasm: p, parent: t },
                  c = null;
                t.asmPreload = t.asm;
                var f = t.reallocBuffer;
                t.reallocBuffer = function (e) {
                  if ("asmjs" === l) var r = f(e);
                  else
                    e: {
                      e = N(e, t.usingWasm ? q : G);
                      var n = t.buffer.byteLength;
                      if (t.usingWasm)
                        try {
                          r =
                            -1 !== t.wasmMemory.grow((e - n) / 65536)
                              ? (t.buffer = t.wasmMemory.buffer)
                              : null;
                          break e;
                        } catch (e) {
                          r = null;
                          break e;
                        }
                      r = void 0;
                    }
                  return r;
                };
                var l = "";
                t.asm = function (e, r) {
                  if (!r.table) {
                    void 0 === (e = t.wasmTableSize) && (e = 1024);
                    var a = t.wasmMaxTableSize;
                    (r.table =
                      "object" == typeof WebAssembly &&
                      "function" == typeof WebAssembly.Table
                        ? void 0 !== a
                          ? new WebAssembly.Table({
                              initial: e,
                              maximum: a,
                              element: "anyfunc",
                            })
                          : new WebAssembly.Table({
                              initial: e,
                              element: "anyfunc",
                            })
                        : Array(e)),
                      (t.wasmTable = r.table);
                  }
                  return (
                    r.__memory_base || (r.__memory_base = t.STATIC_BASE),
                    r.__table_base || (r.__table_base = 0),
                    d((r = n(r)), "no binaryen method succeeded."),
                    r
                  );
                };
              })();
            var le = [
              function () {
                if (self.crypto && self.crypto.getRandomValues) {
                  var e = new Uint32Array(1);
                  return self.crypto.getRandomValues(e), e[0];
                }
                return 9007199254740991 * Math.random();
              },
            ];
            (B = 433632),
              K.push(
                {
                  g: function () {
                    qr();
                  },
                },
                {
                  g: function () {
                    Kr();
                  },
                },
                {
                  g: function () {
                    an();
                  },
                },
                {
                  g: function () {
                    _n();
                  },
                },
                {
                  g: function () {
                    sn();
                  },
                },
                {
                  g: function () {
                    Zr();
                  },
                },
                {
                  g: function () {
                    Xr();
                  },
                },
                {
                  g: function () {
                    Yr();
                  },
                },
                {
                  g: function () {
                    Ur();
                  },
                },
                {
                  g: function () {
                    Hr();
                  },
                },
                {
                  g: function () {
                    Wr();
                  },
                },
                {
                  g: function () {
                    on();
                  },
                },
                {
                  g: function () {
                    Gr();
                  },
                },
                {
                  g: function () {
                    Jr();
                  },
                },
                {
                  g: function () {
                    Nr();
                  },
                },
                {
                  g: function () {
                    en();
                  },
                },
                {
                  g: function () {
                    Qr();
                  },
                },
                {
                  g: function () {
                    $r();
                  },
                },
                {
                  g: function () {
                    tn();
                  },
                },
                {
                  g: function () {
                    rn();
                  },
                },
                {
                  g: function () {
                    nn();
                  },
                }
              ),
              (t.STATIC_BASE = 1024),
              (t.STATIC_BUMP = 432608);
            var pe = B;
            B += 16;
            var he = {};
            function me() {
              yn();
            }
            function de() {
              return (
                "undefined" != typeof dateNow ||
                (self.performance && self.performance.now)
              );
            }
            var be = {
              I: 1,
              u: 2,
              Fc: 3,
              Bb: 4,
              M: 5,
              ja: 6,
              Ua: 7,
              Zb: 8,
              B: 9,
              ib: 10,
              fa: 11,
              Pc: 11,
              ya: 12,
              W: 13,
              ub: 14,
              lc: 15,
              ga: 16,
              ha: 17,
              Qc: 18,
              Y: 19,
              Z: 20,
              N: 21,
              i: 22,
              Ub: 23,
              wa: 24,
              D: 25,
              Mc: 26,
              vb: 27,
              hc: 28,
              O: 29,
              Cc: 30,
              Nb: 31,
              vc: 32,
              rb: 33,
              zc: 34,
              cc: 42,
              yb: 43,
              jb: 44,
              Eb: 45,
              Fb: 46,
              Gb: 47,
              Mb: 48,
              Nc: 49,
              Xb: 50,
              Db: 51,
              ob: 35,
              $b: 37,
              $a: 52,
              cb: 53,
              Rc: 54,
              Vb: 55,
              eb: 56,
              fb: 57,
              pb: 35,
              gb: 59,
              jc: 60,
              Yb: 61,
              Jc: 62,
              ic: 63,
              dc: 64,
              ec: 65,
              Bc: 66,
              ac: 67,
              Xa: 68,
              Gc: 69,
              kb: 70,
              wc: 71,
              Pb: 72,
              sb: 73,
              bb: 74,
              qc: 76,
              ab: 77,
              Ac: 78,
              Hb: 79,
              Ib: 80,
              Lb: 81,
              Kb: 82,
              Jb: 83,
              kc: 38,
              ia: 39,
              Qb: 36,
              X: 40,
              rc: 95,
              uc: 96,
              nb: 104,
              Wb: 105,
              Ya: 97,
              yc: 91,
              oc: 88,
              fc: 92,
              Dc: 108,
              mb: 111,
              Va: 98,
              lb: 103,
              Tb: 101,
              Rb: 100,
              Kc: 110,
              wb: 112,
              xb: 113,
              Ab: 115,
              Za: 114,
              qb: 89,
              Ob: 90,
              xc: 93,
              Ec: 94,
              Wa: 99,
              Sb: 102,
              Cb: 106,
              mc: 107,
              Lc: 109,
              Oc: 87,
              tb: 122,
              Hc: 116,
              pc: 95,
              bc: 123,
              zb: 84,
              sc: 75,
              hb: 125,
              nc: 131,
              tc: 130,
              Ic: 86,
            };
            function ye(e) {
              return (
                t.___errno_location && (S[t.___errno_location() >> 2] = e), e
              );
            }
            function ve(e, t) {
              if (0 === e) e = Date.now();
              else {
                if (1 !== e || !de()) return ye(be.i), -1;
                e = me();
              }
              return (
                (S[t >> 2] = (e / 1e3) | 0),
                (S[(t + 4) >> 2] = ((e % 1e3) * 1e6) | 0),
                0
              );
            }
            var ge = 0,
              we = [],
              Me = {};
            function ke(e) {
              if (!e || Me[e]) return e;
              for (var t in Me) {
                var r = +t;
                if (Me[r].ka === e) return r;
              }
              return e;
            }
            function ze(e) {
              if (e) {
                var r = Me[e];
                d(0 < r.J),
                  r.J--,
                  0 !== r.J ||
                    r.L ||
                    (r.oa && t.dynCall_vi(r.oa, e), delete Me[e], Ae(e));
              }
            }
            function Ae(e) {
              try {
                return fn(e);
              } catch (e) {}
            }
            function xe() {
              var e = we.pop();
              throw (
                ((e = ke(e)),
                Me[e].L || (we.push(e), (Me[e].L = !0)),
                (ge = e),
                e +
                  " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.")
              );
            }
            var Le = {
              0: "Success",
              1: "Not super-user",
              2: "No such file or directory",
              3: "No such process",
              4: "Interrupted system call",
              5: "I/O error",
              6: "No such device or address",
              7: "Arg list too long",
              8: "Exec format error",
              9: "Bad file number",
              10: "No children",
              11: "No more processes",
              12: "Not enough core",
              13: "Permission denied",
              14: "Bad address",
              15: "Block device required",
              16: "Mount device busy",
              17: "File exists",
              18: "Cross-device link",
              19: "No such device",
              20: "Not a directory",
              21: "Is a directory",
              22: "Invalid argument",
              23: "Too many open files in system",
              24: "Too many open files",
              25: "Not a typewriter",
              26: "Text file busy",
              27: "File too large",
              28: "No space left on device",
              29: "Illegal seek",
              30: "Read only file system",
              31: "Too many links",
              32: "Broken pipe",
              33: "Math arg out of domain of func",
              34: "Math result not representable",
              35: "File locking deadlock error",
              36: "File or path name too long",
              37: "No record locks available",
              38: "Function not implemented",
              39: "Directory not empty",
              40: "Too many symbolic links",
              42: "No message of desired type",
              43: "Identifier removed",
              44: "Channel number out of range",
              45: "Level 2 not synchronized",
              46: "Level 3 halted",
              47: "Level 3 reset",
              48: "Link number out of range",
              49: "Protocol driver not attached",
              50: "No CSI structure available",
              51: "Level 2 halted",
              52: "Invalid exchange",
              53: "Invalid request descriptor",
              54: "Exchange full",
              55: "No anode",
              56: "Invalid request code",
              57: "Invalid slot",
              59: "Bad font file fmt",
              60: "Device not a stream",
              61: "No data (for no delay io)",
              62: "Timer expired",
              63: "Out of streams resources",
              64: "Machine is not on the network",
              65: "Package not installed",
              66: "The object is remote",
              67: "The link has been severed",
              68: "Advertise error",
              69: "Srmount error",
              70: "Communication error on send",
              71: "Protocol error",
              72: "Multihop attempted",
              73: "Cross mount point (not really error)",
              74: "Trying to read unreadable message",
              75: "Value too large for defined data type",
              76: "Given log. name not unique",
              77: "f.d. invalid for this operation",
              78: "Remote address changed",
              79: "Can   access a needed shared lib",
              80: "Accessing a corrupted shared lib",
              81: ".lib section in a.out corrupted",
              82: "Attempting to link in too many libs",
              83: "Attempting to exec a shared library",
              84: "Illegal byte sequence",
              86: "Streams pipe error",
              87: "Too many users",
              88: "Socket operation on non-socket",
              89: "Destination address required",
              90: "Message too long",
              91: "Protocol wrong type for socket",
              92: "Protocol not available",
              93: "Unknown protocol",
              94: "Socket type not supported",
              95: "Not supported",
              96: "Protocol family not supported",
              97: "Address family not supported by protocol family",
              98: "Address already in use",
              99: "Address not available",
              100: "Network interface is not configured",
              101: "Network is unreachable",
              102: "Connection reset by network",
              103: "Connection aborted",
              104: "Connection reset by peer",
              105: "No buffer space available",
              106: "Socket is already connected",
              107: "Socket is not connected",
              108: "Can't send after socket shutdown",
              109: "Too many references",
              110: "Connection timed out",
              111: "Connection refused",
              112: "Host is down",
              113: "Host is unreachable",
              114: "Socket already connected",
              115: "Connection already in progress",
              116: "Stale file handle",
              122: "Quota exceeded",
              123: "No medium (in tape drive)",
              125: "Operation canceled",
              130: "Previous owner died",
              131: "State not recoverable",
            };
            function Ee(e, t) {
              for (var r = 0, n = e.length - 1; 0 <= n; n--) {
                var a = e[n];
                "." === a
                  ? e.splice(n, 1)
                  : ".." === a
                  ? (e.splice(n, 1), r++)
                  : r && (e.splice(n, 1), r--);
              }
              if (t) for (; r; r--) e.unshift("..");
              return e;
            }
            function Ce(e) {
              var t = "/" === e.charAt(0),
                r = "/" === e.substr(-1);
              return (
                (e = Ee(
                  e.split("/").filter(function (e) {
                    return !!e;
                  }),
                  !t
                ).join("/")) ||
                  t ||
                  (e = "."),
                e && r && (e += "/"),
                (t ? "/" : "") + e
              );
            }
            function Oe(e) {
              var t =
                /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                  .exec(e)
                  .slice(1);
              return (
                (e = t[0]),
                (t = t[1]),
                e || t ? (t && (t = t.substr(0, t.length - 1)), e + t) : "."
              );
            }
            function Se(e) {
              if ("/" === e) return "/";
              var t = e.lastIndexOf("/");
              return -1 === t ? e : e.substr(t + 1);
            }
            function Te() {
              for (
                var e = "", t = !1, r = arguments.length - 1;
                -1 <= r && !t;
                r--
              ) {
                if ("string" != typeof (t = 0 <= r ? arguments[r] : "/"))
                  throw new TypeError(
                    "Arguments to path.resolve must be strings"
                  );
                if (!t) return "";
                (e = t + "/" + e), (t = "/" === t.charAt(0));
              }
              return (
                (t ? "/" : "") +
                  (e = Ee(
                    e.split("/").filter(function (e) {
                      return !!e;
                    }),
                    !t
                  ).join("/")) || "."
              );
            }
            var Pe = [];
            function Ie(e, t) {
              (Pe[e] = { input: [], output: [], G: t }), it(e, Be);
            }
            var Be = {
                open: function (e) {
                  var t = Pe[e.node.rdev];
                  if (!t) throw new He(be.Y);
                  (e.tty = t), (e.seekable = !1);
                },
                close: function (e) {
                  e.tty.G.flush(e.tty);
                },
                flush: function (e) {
                  e.tty.G.flush(e.tty);
                },
                read: function (e, t, r, n) {
                  if (!e.tty || !e.tty.G.ra) throw new He(be.ja);
                  for (var a = 0, i = 0; i < n; i++) {
                    try {
                      var o = e.tty.G.ra(e.tty);
                    } catch (e) {
                      throw new He(be.M);
                    }
                    if (void 0 === o && 0 === a) throw new He(be.fa);
                    if (null == o) break;
                    a++, (t[r + i] = o);
                  }
                  return a && (e.node.timestamp = Date.now()), a;
                },
                write: function (e, t, r, n) {
                  if (!e.tty || !e.tty.G.da) throw new He(be.ja);
                  var a = 0;
                  try {
                    if (0 === r && 0 === n) e.tty.G.flush(e.tty);
                    else for (; a < n; ) e.tty.G.da(e.tty, t[r + a]), a++;
                  } catch (e) {
                    throw new He(be.M);
                  }
                  return n && (e.node.timestamp = Date.now()), a;
                },
              },
              Fe = {
                ra: function (e) {
                  if (!e.input.length) {
                    var t = null;
                    if (
                      ("undefined" != typeof window &&
                      "function" == typeof window.prompt
                        ? null !== (t = window.prompt("Input: ")) && (t += "\n")
                        : "function" == typeof readline &&
                          null !== (t = readline()) &&
                          (t += "\n"),
                      !t)
                    )
                      return null;
                    e.input = Rr(t, !0);
                  }
                  return e.input.shift();
                },
                da: function (e, t) {
                  null === t || 10 === t
                    ? (s(M(e.output, 0)), (e.output = []))
                    : 0 != t && e.output.push(t);
                },
                flush: function (e) {
                  e.output &&
                    0 < e.output.length &&
                    (s(M(e.output, 0)), (e.output = []));
                },
              },
              De = {
                da: function (e, t) {
                  null === t || 10 === t
                    ? (u(M(e.output, 0)), (e.output = []))
                    : 0 != t && e.output.push(t);
                },
                flush: function (e) {
                  e.output &&
                    0 < e.output.length &&
                    (u(M(e.output, 0)), (e.output = []));
                },
              },
              je = {
                o: null,
                A: function () {
                  return je.createNode(null, "/", 16895, 0);
                },
                createNode: function (e, t, r, n) {
                  if (24576 == (61440 & r) || 4096 == (61440 & r))
                    throw new He(be.I);
                  return (
                    je.o ||
                      (je.o = {
                        dir: {
                          node: {
                            m: je.c.m,
                            s: je.c.s,
                            lookup: je.c.lookup,
                            R: je.c.R,
                            rename: je.c.rename,
                            unlink: je.c.unlink,
                            rmdir: je.c.rmdir,
                            readdir: je.c.readdir,
                            symlink: je.c.symlink,
                          },
                          stream: { F: je.f.F },
                        },
                        file: {
                          node: { m: je.c.m, s: je.c.s },
                          stream: {
                            F: je.f.F,
                            read: je.f.read,
                            write: je.f.write,
                            la: je.f.la,
                            sa: je.f.sa,
                            T: je.f.T,
                          },
                        },
                        link: {
                          node: {
                            m: je.c.m,
                            s: je.c.s,
                            readlink: je.c.readlink,
                          },
                          stream: {},
                        },
                        na: { node: { m: je.c.m, s: je.c.s }, stream: at },
                      }),
                    16384 == (61440 & (r = Qe(e, t, r, n)).mode)
                      ? ((r.c = je.o.dir.node),
                        (r.f = je.o.dir.stream),
                        (r.b = {}))
                      : 32768 == (61440 & r.mode)
                      ? ((r.c = je.o.file.node),
                        (r.f = je.o.file.stream),
                        (r.h = 0),
                        (r.b = null))
                      : 40960 == (61440 & r.mode)
                      ? ((r.c = je.o.link.node), (r.f = je.o.link.stream))
                      : 8192 == (61440 & r.mode) &&
                        ((r.c = je.o.na.node), (r.f = je.o.na.stream)),
                    (r.timestamp = Date.now()),
                    e && (e.b[t] = r),
                    r
                  );
                },
                Ea: function (e) {
                  if (e.b && e.b.subarray) {
                    for (var t = [], r = 0; r < e.h; ++r) t.push(e.b[r]);
                    return t;
                  }
                  return e.b;
                },
                Wc: function (e) {
                  return e.b
                    ? e.b.subarray
                      ? e.b.subarray(0, e.h)
                      : new Uint8Array(e.b)
                    : new Uint8Array();
                },
                pa: function (e, t) {
                  if (
                    (e.b &&
                      e.b.subarray &&
                      t > e.b.length &&
                      ((e.b = je.Ea(e)), (e.h = e.b.length)),
                    !e.b || e.b.subarray)
                  ) {
                    var r = e.b ? e.b.length : 0;
                    r >= t ||
                      ((t = Math.max(t, (r * (1048576 > r ? 2 : 1.125)) | 0)),
                      0 != r && (t = Math.max(t, 256)),
                      (r = e.b),
                      (e.b = new Uint8Array(t)),
                      0 < e.h && e.b.set(r.subarray(0, e.h), 0));
                  } else
                    for (!e.b && 0 < t && (e.b = []); e.b.length < t; )
                      e.b.push(0);
                },
                Ma: function (e, t) {
                  if (e.h != t)
                    if (0 == t) (e.b = null), (e.h = 0);
                    else {
                      if (!e.b || e.b.subarray) {
                        var r = e.b;
                        (e.b = new Uint8Array(new ArrayBuffer(t))),
                          r && e.b.set(r.subarray(0, Math.min(t, e.h)));
                      } else if ((e.b || (e.b = []), e.b.length > t))
                        e.b.length = t;
                      else for (; e.b.length < t; ) e.b.push(0);
                      e.h = t;
                    }
                },
                c: {
                  m: function (e) {
                    var t = {};
                    return (
                      (t.dev = 8192 == (61440 & e.mode) ? e.id : 1),
                      (t.ino = e.id),
                      (t.mode = e.mode),
                      (t.nlink = 1),
                      (t.uid = 0),
                      (t.gid = 0),
                      (t.rdev = e.rdev),
                      16384 == (61440 & e.mode)
                        ? (t.size = 4096)
                        : 32768 == (61440 & e.mode)
                        ? (t.size = e.h)
                        : 40960 == (61440 & e.mode)
                        ? (t.size = e.link.length)
                        : (t.size = 0),
                      (t.atime = new Date(e.timestamp)),
                      (t.mtime = new Date(e.timestamp)),
                      (t.ctime = new Date(e.timestamp)),
                      (t.Ca = 4096),
                      (t.blocks = Math.ceil(t.size / t.Ca)),
                      t
                    );
                  },
                  s: function (e, t) {
                    void 0 !== t.mode && (e.mode = t.mode),
                      void 0 !== t.timestamp && (e.timestamp = t.timestamp),
                      void 0 !== t.size && je.Ma(e, t.size);
                  },
                  lookup: function () {
                    throw Ze[be.u];
                  },
                  R: function (e, t, r, n) {
                    return je.createNode(e, t, r, n);
                  },
                  rename: function (e, t, r) {
                    if (16384 == (61440 & e.mode)) {
                      try {
                        var n = Je(t, r);
                      } catch (e) {}
                      if (n) for (var a in n.b) throw new He(be.ia);
                    }
                    delete e.parent.b[e.name],
                      (e.name = r),
                      (t.b[r] = e),
                      (e.parent = t);
                  },
                  unlink: function (e, t) {
                    delete e.b[t];
                  },
                  rmdir: function (e, t) {
                    var r,
                      n = Je(e, t);
                    for (r in n.b) throw new He(be.ia);
                    delete e.b[t];
                  },
                  readdir: function (e) {
                    var t,
                      r = [".", ".."];
                    for (t in e.b) e.b.hasOwnProperty(t) && r.push(t);
                    return r;
                  },
                  symlink: function (e, t, r) {
                    return ((e = je.createNode(e, t, 41471, 0)).link = r), e;
                  },
                  readlink: function (e) {
                    if (40960 != (61440 & e.mode)) throw new He(be.i);
                    return e.link;
                  },
                },
                f: {
                  read: function (e, t, r, n, a) {
                    var i = e.node.b;
                    if (a >= e.node.h) return 0;
                    if (
                      (d(0 <= (e = Math.min(e.node.h - a, n))),
                      8 < e && i.subarray)
                    )
                      t.set(i.subarray(a, a + e), r);
                    else for (n = 0; n < e; n++) t[r + n] = i[a + n];
                    return e;
                  },
                  write: function (e, t, r, n, a, i) {
                    if (((i = !1), !n)) return 0;
                    if (
                      (((e = e.node).timestamp = Date.now()),
                      t.subarray && (!e.b || e.b.subarray))
                    ) {
                      if (i) return (e.b = t.subarray(r, r + n)), (e.h = n);
                      if (0 === e.h && 0 === a)
                        return (
                          (e.b = new Uint8Array(t.subarray(r, r + n))),
                          (e.h = n)
                        );
                      if (a + n <= e.h)
                        return e.b.set(t.subarray(r, r + n), a), n;
                    }
                    if ((je.pa(e, a + n), e.b.subarray && t.subarray))
                      e.b.set(t.subarray(r, r + n), a);
                    else for (i = 0; i < n; i++) e.b[a + i] = t[r + i];
                    return (e.h = Math.max(e.h, a + n)), n;
                  },
                  F: function (e, t, r) {
                    if (
                      (1 === r
                        ? (t += e.position)
                        : 2 === r &&
                          32768 == (61440 & e.node.mode) &&
                          (t += e.node.h),
                      0 > t)
                    )
                      throw new He(be.i);
                    return t;
                  },
                  la: function (e, t, r) {
                    je.pa(e.node, t + r),
                      (e.node.h = Math.max(e.node.h, t + r));
                  },
                  sa: function (e, t, r, n, a, i, o) {
                    if (32768 != (61440 & e.node.mode)) throw new He(be.Y);
                    if (
                      ((r = e.node.b),
                      2 & o || (r.buffer !== t && r.buffer !== t.buffer))
                    ) {
                      if (
                        ((0 < a || a + n < e.node.h) &&
                          (r = r.subarray
                            ? r.subarray(a, a + n)
                            : Array.prototype.slice.call(r, a, a + n)),
                        (e = !0),
                        !(n = ln(n)))
                      )
                        throw new He(be.ya);
                      t.set(r, n);
                    } else (e = !1), (n = r.byteOffset);
                    return { Ka: n, za: e };
                  },
                  T: function (e, t, r, n, a) {
                    if (32768 != (61440 & e.node.mode)) throw new He(be.Y);
                    return 2 & a || je.f.write(e, t, 0, n, r, !1), 0;
                  },
                },
              };
            (B += 16), (B += 16), (B += 16);
            var Re = null,
              Ve = {},
              qe = [],
              Ge = 1,
              Ne = null,
              Ue = !0,
              We = {},
              He = null,
              Ze = {};
            function Ye(e, t) {
              if (((t = t || {}), !(e = Te("/", e))))
                return { path: "", node: null };
              var r,
                n = { qa: !0, ea: 0 };
              for (r in n) void 0 === t[r] && (t[r] = n[r]);
              if (8 < t.ea) throw new He(be.X);
              e = Ee(
                e.split("/").filter(function (e) {
                  return !!e;
                }),
                !1
              );
              var a = Re;
              for (n = "/", r = 0; r < e.length; r++) {
                var i = r === e.length - 1;
                if (i && t.parent) break;
                if (
                  ((a = Je(a, e[r])),
                  (n = Ce(n + "/" + e[r])),
                  a.S && (!i || (i && t.qa)) && (a = a.S.root),
                  !i || t.aa)
                )
                  for (i = 0; 40960 == (61440 & a.mode); )
                    if (
                      ((a = ft(n)),
                      (a = Ye((n = Te(Oe(n), a)), { ea: t.ea }).node),
                      40 < i++)
                    )
                      throw new He(be.X);
              }
              return { path: n, node: a };
            }
            function Xe(e) {
              for (var t; ; ) {
                if (e === e.parent)
                  return (
                    (e = e.A.ta),
                    t ? ("/" !== e[e.length - 1] ? e + "/" + t : e + t) : e
                  );
                (t = t ? e.name + "/" + t : e.name), (e = e.parent);
              }
            }
            function Ke(e, t) {
              for (var r = 0, n = 0; n < t.length; n++)
                r = ((r << 5) - r + t.charCodeAt(n)) | 0;
              return ((e + r) >>> 0) % Ne.length;
            }
            function Je(e, t) {
              var r;
              if ((r = (r = tt(e, "x")) ? r : e.c.lookup ? 0 : be.W))
                throw new He(r, e);
              for (r = Ne[Ke(e.id, t)]; r; r = r.Ja) {
                var n = r.name;
                if (r.parent.id === e.id && n === t) return r;
              }
              return e.c.lookup(e, t);
            }
            function Qe(e, t, r, n) {
              return (
                yt ||
                  (((yt = function (e, t, r, n) {
                    e || (e = this),
                      (this.parent = e),
                      (this.A = e.A),
                      (this.S = null),
                      (this.id = Ge++),
                      (this.name = t),
                      (this.mode = r),
                      (this.c = {}),
                      (this.f = {}),
                      (this.rdev = n);
                  }).prototype = {}),
                  Object.defineProperties(yt.prototype, {
                    read: {
                      get: function () {
                        return 365 == (365 & this.mode);
                      },
                      set: function (e) {
                        e ? (this.mode |= 365) : (this.mode &= -366);
                      },
                    },
                    write: {
                      get: function () {
                        return 146 == (146 & this.mode);
                      },
                      set: function (e) {
                        e ? (this.mode |= 146) : (this.mode &= -147);
                      },
                    },
                  })),
                (function (e) {
                  var t = Ke(e.parent.id, e.name);
                  (e.Ja = Ne[t]), (Ne[t] = e);
                })((e = new yt(e, t, r, n))),
                e
              );
            }
            var $e = {
              r: 0,
              rs: 1052672,
              "r+": 2,
              w: 577,
              wx: 705,
              xw: 705,
              "w+": 578,
              "wx+": 706,
              "xw+": 706,
              a: 1089,
              ax: 1217,
              xa: 1217,
              "a+": 1090,
              "ax+": 1218,
              "xa+": 1218,
            };
            function et(e) {
              var t = ["r", "w", "rw"][3 & e];
              return 512 & e && (t += "w"), t;
            }
            function tt(e, t) {
              return Ue ||
                ((-1 === t.indexOf("r") || 292 & e.mode) &&
                  (-1 === t.indexOf("w") || 146 & e.mode) &&
                  (-1 === t.indexOf("x") || 73 & e.mode))
                ? 0
                : be.W;
            }
            function rt(e, t) {
              try {
                return Je(e, t), be.ha;
              } catch (e) {}
              return tt(e, "wx");
            }
            var nt,
              at = {
                open: function (e) {
                  (e.f = Ve[e.node.rdev].f), e.f.open && e.f.open(e);
                },
                F: function () {
                  throw new He(be.O);
                },
              };
            function it(e, t) {
              Ve[e] = { f: t };
            }
            function ot(e, t) {
              var r = "/" === t,
                n = !t;
              if (r && Re) throw new He(be.ga);
              if (!r && !n) {
                var a = Ye(t, { qa: !1 });
                if (((t = a.path), (a = a.node).S)) throw new He(be.ga);
                if (16384 != (61440 & a.mode)) throw new He(be.Z);
              }
              (t = { type: e, $c: {}, ta: t, Ia: [] }),
                ((e = e.A(t)).A = t),
                (t.root = e),
                r ? (Re = e) : a && ((a.S = t), a.A && a.A.Ia.push(t));
            }
            function st(e, t, r) {
              var n = Ye(e, { parent: !0 }).node;
              if (!(e = Se(e)) || "." === e || ".." === e) throw new He(be.i);
              var a = rt(n, e);
              if (a) throw new He(a);
              if (!n.c.R) throw new He(be.I);
              return n.c.R(n, e, t, r);
            }
            function ut(e) {
              st(e, 16895, 0);
            }
            function _t(e, t, r) {
              void 0 === r && ((r = t), (t = 438)), st(e, 8192 | t, r);
            }
            function ct(e, t) {
              if (!Te(e)) throw new He(be.u);
              var r = Ye(t, { parent: !0 }).node;
              if (!r) throw new He(be.u);
              var n = rt(r, (t = Se(t)));
              if (n) throw new He(n);
              if (!r.c.symlink) throw new He(be.I);
              r.c.symlink(r, t, e);
            }
            function ft(e) {
              if (!(e = Ye(e).node)) throw new He(be.u);
              if (!e.c.readlink) throw new He(be.i);
              return Te(Xe(e.parent), e.c.readlink(e));
            }
            function lt(e, r, n, a) {
              if ("" === e) throw new He(be.u);
              if ("string" == typeof r) {
                var i = $e[r];
                if (void 0 === i) throw Error("Unknown file open mode: " + r);
                r = i;
              }
              if (
                ((n = 64 & r ? (4095 & (void 0 === n ? 438 : n)) | 32768 : 0),
                "object" == typeof e)
              )
                var o = e;
              else {
                e = Ce(e);
                try {
                  o = Ye(e, { aa: !(131072 & r) }).node;
                } catch (e) {}
              }
              if (((i = !1), 64 & r))
                if (o) {
                  if (128 & r) throw new He(be.ha);
                } else (o = st(e, n, 0)), (i = !0);
              if (!o) throw new He(be.u);
              if (
                (8192 == (61440 & o.mode) && (r &= -513),
                65536 & r && 16384 != (61440 & o.mode))
              )
                throw new He(be.Z);
              if (
                !i &&
                (n = o
                  ? 40960 == (61440 & o.mode)
                    ? be.X
                    : 16384 == (61440 & o.mode) && ("r" !== et(r) || 512 & r)
                    ? be.N
                    : tt(o, et(r))
                  : be.u)
              )
                throw new He(n);
              if (512 & r) {
                var s;
                if (
                  !(s = "string" == typeof (n = o) ? Ye(n, { aa: !0 }).node : n)
                    .c.s
                )
                  throw new He(be.I);
                if (16384 == (61440 & s.mode)) throw new He(be.N);
                if (32768 != (61440 & s.mode)) throw new He(be.i);
                if ((n = tt(s, "w"))) throw new He(n);
                s.c.s(s, { size: 0, timestamp: Date.now() });
              }
              (r &= -641),
                (a = (function (e, t) {
                  vt ||
                    (((vt = function () {}).prototype = {}),
                    Object.defineProperties(vt.prototype, {
                      object: {
                        get: function () {
                          return this.node;
                        },
                        set: function (e) {
                          this.node = e;
                        },
                      },
                    }));
                  var r,
                    n = new vt();
                  for (r in e) n[r] = e[r];
                  return (
                    (e = n),
                    (t = (function (e) {
                      for (e = e || 0; e <= 4096; e++) if (!qe[e]) return e;
                      throw new He(be.wa);
                    })(t)),
                    (e.fd = t),
                    (qe[t] = e)
                  );
                })(
                  {
                    node: o,
                    path: Xe(o),
                    flags: r,
                    seekable: !0,
                    position: 0,
                    f: o.f,
                    Sa: [],
                    error: !1,
                  },
                  a
                )).f.open && a.f.open(a),
                !t.logReadFiles ||
                  1 & r ||
                  (gt || (gt = {}),
                  e in gt ||
                    ((gt[e] = 1),
                    console.log(
                      "FS.trackingDelegate error on read file: " + e
                    )));
              try {
                We.onOpenFile &&
                  ((o = 0),
                  1 != (2097155 & r) && (o |= 1),
                  0 != (2097155 & r) && (o |= 2),
                  We.onOpenFile(e, o));
              } catch (t) {
                console.log(
                  "FS.trackingDelegate['onOpenFile']('" +
                    e +
                    "', flags) threw an exception: " +
                    t.message
                );
              }
              return a;
            }
            function pt(e) {
              if (null === e.fd) throw new He(be.B);
              e.ba && (e.ba = null);
              try {
                e.f.close && e.f.close(e);
              } catch (e) {
                throw e;
              } finally {
                qe[e.fd] = null;
              }
              e.fd = null;
            }
            function ht(e, t, r) {
              if (null === e.fd) throw new He(be.B);
              if (!e.seekable || !e.f.F) throw new He(be.O);
              (e.position = e.f.F(e, t, r)), (e.Sa = []);
            }
            function mt() {
              He ||
                (((He = function (e, t) {
                  (this.node = t),
                    (this.Na = function (e) {
                      for (var t in ((this.v = e), be))
                        if (be[t] === e) {
                          this.code = t;
                          break;
                        }
                    }),
                    this.Na(e),
                    (this.message = Le[e]),
                    this.stack &&
                      Object.defineProperty(this, "stack", {
                        value: Error().stack,
                        writable: !0,
                      });
                }).prototype = Error()),
                (He.prototype.constructor = He),
                [be.u].forEach(function (e) {
                  (Ze[e] = new He(e)),
                    (Ze[e].stack = "<generic error, no stack>");
                }));
            }
            function dt(e, t, r) {
              e = Ce("/dev/" + e);
              var n = (function (e, t) {
                var r = 0;
                return e && (r |= 365), t && (r |= 146), r;
              })(!!t, !!r);
              bt || (bt = 64);
              var a = (bt++ << 8) | 0;
              it(a, {
                open: function (e) {
                  e.seekable = !1;
                },
                close: function () {
                  r && r.buffer && r.buffer.length && r(10);
                },
                read: function (e, r, n, a) {
                  for (var i = 0, o = 0; o < a; o++) {
                    try {
                      var s = t();
                    } catch (e) {
                      throw new He(be.M);
                    }
                    if (void 0 === s && 0 === i) throw new He(be.fa);
                    if (null == s) break;
                    i++, (r[n + o] = s);
                  }
                  return i && (e.node.timestamp = Date.now()), i;
                },
                write: function (e, t, n, a) {
                  for (var i = 0; i < a; i++)
                    try {
                      r(t[n + i]);
                    } catch (e) {
                      throw new He(be.M);
                    }
                  return a && (e.node.timestamp = Date.now()), i;
                },
              }),
                _t(e, n, a);
            }
            var bt,
              yt,
              vt,
              gt,
              wt = {},
              Mt = {},
              kt = 0;
            function zt() {
              return S[((kt += 4) - 4) >> 2];
            }
            function At() {
              var e = qe[zt()];
              if (!e) throw new He(be.B);
              return e;
            }
            function xt(e, r) {
              if (((Ft = e), (Dt = r), !It)) return 1;
              if (0 == e)
                (St = function () {
                  var e = 0 | Math.max(0, Et + r - me());
                  setTimeout(Ct, e);
                }),
                  (Tt = "timeout");
              else if (1 == e)
                (St = function () {
                  Qt(Ct);
                }),
                  (Tt = "rAF");
              else if (2 == e) {
                if ("undefined" == typeof setImmediate) {
                  var n = [];
                  addEventListener(
                    "message",
                    function (e) {
                      ("setimmediate" !== e.data &&
                        "setimmediate" !== e.data.target) ||
                        (e.stopPropagation(), n.shift()());
                    },
                    !0
                  ),
                    (setImmediate = function (e) {
                      n.push(e),
                        void 0 === t.setImmediates && (t.setImmediates = []),
                        t.setImmediates.push(e),
                        postMessage({ target: "setimmediate" });
                    });
                }
                (St = function () {
                  setImmediate(Ct);
                }),
                  (Tt = "immediate");
              }
              return 0;
            }
            function Lt(e, r, n, a, i) {
              (t.noExitRuntime = !0),
                d(
                  !It,
                  "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."
                ),
                (It = e),
                (Bt = a);
              var o =
                  void 0 !== a
                    ? function () {
                        t.dynCall_vi(e, a);
                      }
                    : function () {
                        t.dynCall_v(e);
                      },
                s = Pt;
              if (
                ((Ct = function () {
                  if (!m)
                    if (0 < Rt.length) {
                      var e = Date.now(),
                        r = Rt.shift();
                      if ((r.g(r.P), Ot)) {
                        var n = Ot,
                          a = 0 == n % 1 ? n - 1 : Math.floor(n);
                        Ot = r.Tc ? a : (8 * n + (a + 0.5)) / 9;
                      }
                      console.log(
                        'main loop blocker "' +
                          r.name +
                          '" took ' +
                          (Date.now() - e) +
                          " ms"
                      ),
                        t.setStatus &&
                          ((e = t.statusMessage || "Please wait..."),
                          (r = Ot),
                          (n = Vt.Vc),
                          r
                            ? r < n
                              ? t.setStatus(e + " (" + (n - r) + "/" + n + ")")
                              : t.setStatus(e)
                            : t.setStatus("")),
                        s < Pt || setTimeout(Ct, 0);
                    } else if (!(s < Pt))
                      if (
                        ((jt = (jt + 1) | 0), 1 == Ft && 1 < Dt && 0 != jt % Dt)
                      )
                        St();
                      else {
                        if (
                          (0 == Ft && (Et = me()),
                          "timeout" === Tt &&
                            t.K &&
                            (u(
                              "Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"
                            ),
                            (Tt = "")),
                          !(m || (t.preMainLoop && !1 === t.preMainLoop())))
                        ) {
                          try {
                            o();
                          } catch (e) {
                            throw (
                              (e &&
                                "object" == typeof e &&
                                e.stack &&
                                u("exception thrown: " + [e, e.stack]),
                              e)
                            );
                          }
                          t.postMainLoop && t.postMainLoop();
                        }
                        s < Pt ||
                          ("object" == typeof SDL &&
                            SDL.audio &&
                            SDL.audio.La &&
                            SDL.audio.La(),
                          St());
                      }
                }),
                i || (r && 0 < r ? xt(0, 1e3 / r) : xt(1, 1), St()),
                n)
              )
                throw "SimulateInfiniteLoop";
            }
            var Et,
              Ct,
              Ot,
              St = null,
              Tt = "",
              Pt = 0,
              It = null,
              Bt = 0,
              Ft = 0,
              Dt = 0,
              jt = 0,
              Rt = [],
              Vt = {},
              qt = !1,
              Gt = !1,
              Nt = [];
            function Ut(e, r, n, a) {
              if (r && t.K && e == t.canvas) return t.K;
              if (r) {
                var i = { antialias: !1, alpha: !1 };
                if (a) for (var o in a) i[o] = a[o];
                if (
                  (i = (function (e, t) {
                    function r() {}
                    void 0 === t.majorVersion &&
                      void 0 === t.minorVersion &&
                      ((t.majorVersion = 1), (t.minorVersion = 0));
                    try {
                      e.addEventListener("webglcontextcreationerror", r, !1);
                      try {
                        if (1 == t.majorVersion && 0 == t.minorVersion)
                          var n =
                            e.getContext("webgl", t) ||
                            e.getContext("experimental-webgl", t);
                        else {
                          if (2 != t.majorVersion || 0 != t.minorVersion)
                            throw (
                              "Unsupported WebGL context version " +
                              majorVersion +
                              "." +
                              minorVersion +
                              "!"
                            );
                          n = e.getContext("webgl2", t);
                        }
                      } finally {
                        e.removeEventListener(
                          "webglcontextcreationerror",
                          r,
                          !1
                        );
                      }
                      if (!n) throw ":(";
                    } catch (e) {
                      return 0;
                    }
                    return n
                      ? (function (e, t) {
                          var r = zr(wr),
                            n = {
                              handle: r,
                              attributes: t,
                              version: t.majorVersion,
                              GLctx: e,
                            };
                          return (
                            e.canvas && (e.canvas.Sc = n),
                            (wr[r] = n),
                            (void 0 === t.enableExtensionsByDefault ||
                              t.enableExtensionsByDefault) &&
                              (function (e) {
                                if ((e || (e = Mr), !e.Ga)) {
                                  e.Ga = !0;
                                  var t = e.GLctx;
                                  if (2 > e.version) {
                                    var r = t.getExtension(
                                      "ANGLE_instanced_arrays"
                                    );
                                    r &&
                                      ((t.vertexAttribDivisor = function (
                                        e,
                                        t
                                      ) {
                                        r.vertexAttribDivisorANGLE(e, t);
                                      }),
                                      (t.drawArraysInstanced = function (
                                        e,
                                        t,
                                        n,
                                        a
                                      ) {
                                        r.drawArraysInstancedANGLE(e, t, n, a);
                                      }),
                                      (t.drawElementsInstanced = function (
                                        e,
                                        t,
                                        n,
                                        a,
                                        i
                                      ) {
                                        r.drawElementsInstancedANGLE(
                                          e,
                                          t,
                                          n,
                                          a,
                                          i
                                        );
                                      }));
                                    var n = t.getExtension(
                                      "OES_vertex_array_object"
                                    );
                                    n &&
                                      ((t.createVertexArray = function () {
                                        return n.createVertexArrayOES();
                                      }),
                                      (t.deleteVertexArray = function (e) {
                                        n.deleteVertexArrayOES(e);
                                      }),
                                      (t.bindVertexArray = function (e) {
                                        n.bindVertexArrayOES(e);
                                      }),
                                      (t.isVertexArray = function (e) {
                                        return n.isVertexArrayOES(e);
                                      }));
                                    var a =
                                      t.getExtension("WEBGL_draw_buffers");
                                    a &&
                                      (t.drawBuffers = function (e, t) {
                                        a.drawBuffersWEBGL(e, t);
                                      });
                                  }
                                  t.Uc = t.getExtension(
                                    "EXT_disjoint_timer_query"
                                  );
                                  var i =
                                    "OES_texture_float OES_texture_half_float OES_standard_derivatives OES_vertex_array_object WEBGL_compressed_texture_s3tc WEBGL_depth_texture OES_element_index_uint EXT_texture_filter_anisotropic EXT_frag_depth WEBGL_draw_buffers ANGLE_instanced_arrays OES_texture_float_linear OES_texture_half_float_linear EXT_blend_minmax EXT_shader_texture_lod WEBGL_compressed_texture_pvrtc EXT_color_buffer_half_float WEBGL_color_buffer_float EXT_sRGB WEBGL_compressed_texture_etc1 EXT_disjoint_timer_query WEBGL_compressed_texture_etc WEBGL_compressed_texture_astc EXT_color_buffer_float WEBGL_compressed_texture_s3tc_srgb EXT_disjoint_timer_query_webgl2".split(
                                      " "
                                    );
                                  (e = t.getSupportedExtensions()) &&
                                    0 < e.length &&
                                    t
                                      .getSupportedExtensions()
                                      .forEach(function (e) {
                                        -1 != i.indexOf(e) && t.getExtension(e);
                                      });
                                }
                              })(n),
                            r
                          );
                        })(n, t)
                      : 0;
                  })(e, i))
                )
                  var s = wr[i].GLctx;
              } else s = e.getContext("2d");
              return s
                ? (n &&
                    (r ||
                      d(
                        void 0 === Dr,
                        "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"
                      ),
                    (t.K = s),
                    r &&
                      (function (e) {
                        e
                          ? (e = wr[e]) && ((Dr = t.K = e.GLctx), (Mr = e))
                          : (Dr = t.K = Mr = null);
                      })(i),
                    (t.bd = r),
                    Nt.forEach(function (e) {
                      e();
                    }),
                    (function () {
                      function e() {
                        Gt =
                          document.pointerLockElement === t.canvas ||
                          document.mozPointerLockElement === t.canvas ||
                          document.webkitPointerLockElement === t.canvas ||
                          document.msPointerLockElement === t.canvas;
                      }
                      if ((t.preloadPlugins || (t.preloadPlugins = []), !ar)) {
                        ar = !0;
                        try {
                          ir = !0;
                        } catch (e) {
                          (ir = !1),
                            console.log(
                              "warning: no blob constructor, cannot create blobs with mimetypes"
                            );
                        }
                        (or =
                          "undefined" != typeof MozBlobBuilder
                            ? MozBlobBuilder
                            : "undefined" != typeof WebKitBlobBuilder
                            ? WebKitBlobBuilder
                            : ir
                            ? null
                            : console.log("warning: no BlobBuilder")),
                          (sr =
                            "undefined" != typeof window
                              ? window.URL
                                ? window.URL
                                : window.webkitURL
                              : void 0),
                          t.ua ||
                            void 0 !== sr ||
                            (console.log(
                              "warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."
                            ),
                            (t.ua = !0)),
                          t.preloadPlugins.push({
                            canHandle: function (e) {
                              return !t.ua && /\.(jpg|jpeg|png|bmp)$/i.test(e);
                            },
                            handle: function (e, r, n, a) {
                              var i = null;
                              if (ir)
                                try {
                                  (i = new Blob([e], { type: er(r) })).size !==
                                    e.length &&
                                    (i = new Blob([new Uint8Array(e).buffer], {
                                      type: er(r),
                                    }));
                                } catch (e) {
                                  !(function (e) {
                                    l || (l = {}), l[e] || ((l[e] = 1), u(e));
                                  })(
                                    "Blob constructor present but fails: " +
                                      e +
                                      "; falling back to blob builder"
                                  );
                                }
                              i ||
                                ((i = new or()).append(
                                  new Uint8Array(e).buffer
                                ),
                                (i = i.getBlob()));
                              var o = sr.createObjectURL(i),
                                s = new Image();
                              (s.onload = function () {
                                d(
                                  s.complete,
                                  "Image " + r + " could not be decoded"
                                );
                                var a = document.createElement("canvas");
                                (a.width = s.width),
                                  (a.height = s.height),
                                  a.getContext("2d").drawImage(s, 0, 0),
                                  (t.preloadedImages[r] = a),
                                  sr.revokeObjectURL(o),
                                  n && n(e);
                              }),
                                (s.onerror = function () {
                                  console.log(
                                    "Image " + o + " could not be decoded"
                                  ),
                                    a && a();
                                }),
                                (s.src = o);
                            },
                          }),
                          t.preloadPlugins.push({
                            canHandle: function (e) {
                              return (
                                !t.Zc &&
                                e.substr(-4) in
                                  { ".ogg": 1, ".wav": 1, ".mp3": 1 }
                              );
                            },
                            handle: function (e, r, n, a) {
                              function i(a) {
                                s ||
                                  ((s = !0),
                                  (t.preloadedAudios[r] = a),
                                  n && n(e));
                              }
                              function o() {
                                s ||
                                  ((s = !0),
                                  (t.preloadedAudios[r] = new Audio()),
                                  a && a());
                              }
                              var s = !1;
                              if (!ir) return o();
                              try {
                                var u = new Blob([e], { type: er(r) });
                              } catch (e) {
                                return o();
                              }
                              u = sr.createObjectURL(u);
                              var _ = new Audio();
                              _.addEventListener(
                                "canplaythrough",
                                function () {
                                  i(_);
                                },
                                !1
                              ),
                                (_.onerror = function () {
                                  if (!s) {
                                    console.log(
                                      "warning: browser could not fully decode audio " +
                                        r +
                                        ", trying slower base64 approach"
                                    );
                                    for (
                                      var t = "", n = 0, a = 0, o = 0;
                                      o < e.length;
                                      o++
                                    )
                                      for (
                                        n = (n << 8) | e[o], a += 8;
                                        6 <= a;

                                      ) {
                                        var u = (n >> (a - 6)) & 63;
                                        (a -= 6),
                                          (t +=
                                            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                                              u
                                            ]);
                                      }
                                    2 == a
                                      ? ((t +=
                                          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                                            (3 & n) << 4
                                          ]),
                                        (t += "=="))
                                      : 4 == a &&
                                        ((t +=
                                          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                                            (15 & n) << 2
                                          ]),
                                        (t += "=")),
                                      (_.src =
                                        "data:audio/x-" +
                                        r.substr(-3) +
                                        ";base64," +
                                        t),
                                      i(_);
                                  }
                                }),
                                (_.src = u),
                                $t(function () {
                                  i(_);
                                }, 1e4);
                            },
                          });
                        var r = t.canvas;
                        r &&
                          ((r.requestPointerLock =
                            r.requestPointerLock ||
                            r.mozRequestPointerLock ||
                            r.webkitRequestPointerLock ||
                            r.msRequestPointerLock ||
                            function () {}),
                          (r.exitPointerLock =
                            document.exitPointerLock ||
                            document.mozExitPointerLock ||
                            document.webkitExitPointerLock ||
                            document.msExitPointerLock ||
                            function () {}),
                          (r.exitPointerLock =
                            r.exitPointerLock.bind(document)),
                          document.addEventListener("pointerlockchange", e, !1),
                          document.addEventListener(
                            "mozpointerlockchange",
                            e,
                            !1
                          ),
                          document.addEventListener(
                            "webkitpointerlockchange",
                            e,
                            !1
                          ),
                          document.addEventListener(
                            "mspointerlockchange",
                            e,
                            !1
                          ),
                          t.elementPointerLock &&
                            r.addEventListener(
                              "click",
                              function (e) {
                                !Gt &&
                                  t.canvas.requestPointerLock &&
                                  (t.canvas.requestPointerLock(),
                                  e.preventDefault());
                              },
                              !1
                            ));
                      }
                    })()),
                  s)
                : null;
            }
            var Wt = !1,
              Ht = void 0,
              Zt = void 0;
            function Yt(e, r, n) {
              function a() {
                qt = !1;
                var e = i.parentNode;
                (document.fullscreenElement ||
                  document.mozFullScreenElement ||
                  document.msFullscreenElement ||
                  document.webkitFullscreenElement ||
                  document.webkitCurrentFullScreenElement) === e
                  ? ((i.exitFullscreen =
                      document.exitFullscreen ||
                      document.cancelFullScreen ||
                      document.mozCancelFullScreen ||
                      document.msExitFullscreen ||
                      document.webkitCancelFullScreen ||
                      function () {}),
                    (i.exitFullscreen = i.exitFullscreen.bind(document)),
                    Ht && i.requestPointerLock(),
                    (qt = !0),
                    Zt
                      ? ("undefined" != typeof SDL &&
                          (S[SDL.screen >> 2] = 8388608 | T[SDL.screen >> 2]),
                        nr(t.canvas),
                        rr())
                      : nr(i))
                  : (e.parentNode.insertBefore(i, e),
                    e.parentNode.removeChild(e),
                    Zt
                      ? ("undefined" != typeof SDL &&
                          (S[SDL.screen >> 2] = -8388609 & T[SDL.screen >> 2]),
                        nr(t.canvas),
                        rr())
                      : nr(i)),
                  t.onFullScreen && t.onFullScreen(qt),
                  t.onFullscreen && t.onFullscreen(qt);
              }
              void 0 === (Ht = e) && (Ht = !0),
                void 0 === (Zt = r) && (Zt = !1);
              var i = t.canvas;
              Wt ||
                ((Wt = !0),
                document.addEventListener("fullscreenchange", a, !1),
                document.addEventListener("mozfullscreenchange", a, !1),
                document.addEventListener("webkitfullscreenchange", a, !1),
                document.addEventListener("MSFullscreenChange", a, !1));
              var o = document.createElement("div");
              i.parentNode.insertBefore(o, i),
                o.appendChild(i),
                (o.requestFullscreen =
                  o.requestFullscreen ||
                  o.mozRequestFullScreen ||
                  o.msRequestFullscreen ||
                  (o.webkitRequestFullscreen
                    ? function () {
                        o.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                      }
                    : null) ||
                  (o.webkitRequestFullScreen
                    ? function () {
                        o.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                      }
                    : null)),
                n ? o.requestFullscreen({ cd: n }) : o.requestFullscreen();
            }
            function Xt(e, t, r) {
              return (
                u(
                  "Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead."
                ),
                (Xt = function (e, t, r) {
                  return Yt(e, t, r);
                }),
                Yt(e, t, r)
              );
            }
            var Kt = 0;
            function Jt(e) {
              var t = Date.now();
              if (0 === Kt) Kt = t + 1e3 / 60;
              else for (; t + 2 >= Kt; ) Kt += 1e3 / 60;
              setTimeout(e, Math.max(Kt - t, 0));
            }
            function Qt(e) {
              "undefined" == typeof window
                ? Jt(e)
                : (window.requestAnimationFrame ||
                    (window.requestAnimationFrame =
                      window.requestAnimationFrame ||
                      window.mozRequestAnimationFrame ||
                      window.webkitRequestAnimationFrame ||
                      window.msRequestAnimationFrame ||
                      window.oRequestAnimationFrame ||
                      Jt),
                  window.requestAnimationFrame(e));
            }
            function $t(e, r) {
              (t.noExitRuntime = !0),
                setTimeout(function () {
                  m || e();
                }, r);
            }
            function er(e) {
              return {
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                png: "image/png",
                bmp: "image/bmp",
                ogg: "audio/ogg",
                wav: "audio/wav",
                mp3: "audio/mpeg",
              }[e.substr(e.lastIndexOf(".") + 1)];
            }
            var tr = [];
            function rr() {
              var e = t.canvas;
              tr.forEach(function (t) {
                t(e.width, e.height);
              });
            }
            function nr(e, r, n) {
              r && n ? ((e.Ta = r), (e.Fa = n)) : ((r = e.Ta), (n = e.Fa));
              var a = r,
                i = n;
              if (
                (t.forcedAspectRatio &&
                  0 < t.forcedAspectRatio &&
                  (a / i < t.forcedAspectRatio
                    ? (a = Math.round(i * t.forcedAspectRatio))
                    : (i = Math.round(a / t.forcedAspectRatio))),
                (document.fullscreenElement ||
                  document.mozFullScreenElement ||
                  document.msFullscreenElement ||
                  document.webkitFullscreenElement ||
                  document.webkitCurrentFullScreenElement) === e.parentNode &&
                  "undefined" != typeof screen)
              ) {
                var o = Math.min(screen.width / a, screen.height / i);
                (a = Math.round(a * o)), (i = Math.round(i * o));
              }
              Zt
                ? (e.width != a && (e.width = a),
                  e.height != i && (e.height = i),
                  void 0 !== e.style &&
                    (e.style.removeProperty("width"),
                    e.style.removeProperty("height")))
                : (e.width != r && (e.width = r),
                  e.height != n && (e.height = n),
                  void 0 !== e.style &&
                    (a != r || i != n
                      ? (e.style.setProperty("width", a + "px", "important"),
                        e.style.setProperty("height", i + "px", "important"))
                      : (e.style.removeProperty("width"),
                        e.style.removeProperty("height"))));
            }
            var ar,
              ir,
              or,
              sr,
              ur = [],
              _r = void 0;
            function cr(e, t) {
              (T[e >> 2] = t), (T[(e + 4) >> 2] = (t / 4294967296) | 0);
            }
            function fr(e, t, r, n) {
              var a = T[(e + 8) >> 2];
              if (a) {
                var i = g(a),
                  o = e + 112,
                  s = g(o);
                s || (s = "GET");
                var u = T[(o + 48) >> 2],
                  _ = T[(o + 52) >> 2],
                  c = !!T[(o + 56) >> 2],
                  f = T[(o + 64) >> 2],
                  l = T[(o + 68) >> 2];
                a = T[(o + 72) >> 2];
                var p = T[(o + 76) >> 2],
                  h = T[(o + 80) >> 2];
                o = T[(o + 84) >> 2];
                var m = !!(1 & u),
                  d = !!(2 & u);
                (u = !!(64 & u)),
                  (f = f ? g(f) : void 0),
                  (l = l ? g(l) : void 0);
                var b = p ? g(p) : void 0,
                  y = new XMLHttpRequest();
                if (
                  ((y.withCredentials = c),
                  y.open(s, i, !u, f, l),
                  u || (y.timeout = _),
                  (y.l = i),
                  (y.responseType = d
                    ? "moz-chunked-arraybuffer"
                    : "arraybuffer"),
                  p && y.overrideMimeType(b),
                  a)
                )
                  for (; (s = T[a >> 2]) && (i = T[(a + 4) >> 2]); )
                    (a += 8), (s = g(s)), (i = g(i)), y.setRequestHeader(s, i);
                ur.push(y),
                  (T[(e + 0) >> 2] = ur.length),
                  (a = h && o ? E.slice(h, h + o) : null),
                  (y.onload = function (n) {
                    var a = y.response ? y.response.byteLength : 0,
                      i = 0,
                      o = 0;
                    m &&
                      !d &&
                      ((i = ln((o = a))), E.set(new Uint8Array(y.response), i)),
                      (T[(e + 12) >> 2] = i),
                      cr(e + 16, o),
                      cr(e + 24, 0),
                      a && cr(e + 32, a),
                      (O[(e + 40) >> 1] = y.readyState),
                      4 === y.readyState &&
                        0 === y.status &&
                        (y.status = 0 < a ? 200 : 404),
                      (O[(e + 42) >> 1] = y.status),
                      y.statusText && z(y.statusText, E, e + 44, 64),
                      200 == y.status ? t && t(e, y, n) : r && r(e, y, n);
                  }),
                  (y.onerror = function (t) {
                    var n = y.status;
                    4 == y.readyState && 0 == n && (n = 404),
                      (T[(e + 12) >> 2] = 0),
                      cr(e + 16, 0),
                      cr(e + 24, 0),
                      cr(e + 32, 0),
                      (O[(e + 40) >> 1] = y.readyState),
                      (O[(e + 42) >> 1] = n),
                      r && r(e, y, t);
                  }),
                  (y.ontimeout = function (t) {
                    r && r(e, y, t);
                  }),
                  (y.onprogress = function (t) {
                    var r = m && d && y.response ? y.response.byteLength : 0,
                      a = 0;
                    m &&
                      d &&
                      ((a = ln(r)), E.set(new Uint8Array(y.response), a)),
                      (T[(e + 12) >> 2] = a),
                      cr(e + 16, r),
                      cr(e + 24, t.loaded - r),
                      cr(e + 32, t.total),
                      (O[(e + 40) >> 1] = y.readyState),
                      3 <= y.readyState &&
                        0 === y.status &&
                        0 < t.loaded &&
                        (y.status = 200),
                      (O[(e + 42) >> 1] = y.status),
                      y.statusText && z(y.statusText, E, e + 44, 64),
                      n && n(e, y, t);
                  });
                try {
                  y.send(a);
                } catch (t) {
                  r && r(e, y, t);
                }
              } else r(e, 0, "no url specified!");
            }
            function lr(e, t, r, n, a) {
              if (e) {
                var i = T[(t + 112 + 60) >> 2];
                i || (i = T[(t + 8) >> 2]);
                var o = g(i);
                try {
                  var s = e
                    .transaction(["FILES"], "readwrite")
                    .objectStore("FILES")
                    .put(r, o);
                  (s.onsuccess = function () {
                    (O[(t + 40) >> 1] = 4),
                      (O[(t + 42) >> 1] = 200),
                      z("OK", E, t + 44, 64),
                      n(t, 0, o);
                  }),
                    (s.onerror = function (e) {
                      (O[(t + 40) >> 1] = 4),
                        (O[(t + 42) >> 1] = 413),
                        z("Payload Too Large", E, t + 44, 64),
                        a(t, 0, e);
                    });
                } catch (e) {
                  a(t, 0, e);
                }
              } else a(t, 0, "IndexedDB not available!");
            }
            function pr(e, t, r, n) {
              if (e) {
                var a = T[(t + 112 + 60) >> 2];
                a || (a = T[(t + 8) >> 2]), (a = g(a));
                try {
                  var i = e
                    .transaction(["FILES"], "readonly")
                    .objectStore("FILES")
                    .get(a);
                  (i.onsuccess = function (e) {
                    if (e.target.result) {
                      var a = (e = e.target.result).byteLength || e.length,
                        i = ln(a);
                      E.set(new Uint8Array(e), i),
                        (T[(t + 12) >> 2] = i),
                        cr(t + 16, a),
                        cr(t + 24, 0),
                        cr(t + 32, a),
                        (O[(t + 40) >> 1] = 4),
                        (O[(t + 42) >> 1] = 200),
                        z("OK", E, t + 44, 64),
                        r(t, 0, e);
                    } else
                      (O[(t + 40) >> 1] = 4),
                        (O[(t + 42) >> 1] = 404),
                        z("Not Found", E, t + 44, 64),
                        n(t, 0, "no data");
                  }),
                    (i.onerror = function (e) {
                      (O[(t + 40) >> 1] = 4),
                        (O[(t + 42) >> 1] = 404),
                        z("Not Found", E, t + 44, 64),
                        n(t, 0, e);
                    });
                } catch (e) {
                  n(t, 0, e);
                }
              } else n(t, 0, "IndexedDB not available!");
            }
            function hr(e, t, r, n) {
              if (e) {
                var a = T[(t + 112 + 60) >> 2];
                a || (a = T[(t + 8) >> 2]), (a = g(a));
                try {
                  var i = e
                    .transaction(["FILES"], "readwrite")
                    .objectStore("FILES")
                    .delete(a);
                  (i.onsuccess = function (e) {
                    (e = e.target.result),
                      (T[(t + 12) >> 2] = 0),
                      cr(t + 16, 0),
                      cr(t + 24, 0),
                      cr(t + 24, 0),
                      (O[(t + 40) >> 1] = 4),
                      (O[(t + 42) >> 1] = 200),
                      z("OK", E, t + 44, 64),
                      r(t, 0, e);
                  }),
                    (i.onerror = function (e) {
                      (O[(t + 40) >> 1] = 4),
                        (O[(t + 42) >> 1] = 404),
                        z("Not Found", E, t + 44, 64),
                        n(t, 0, e);
                    });
                } catch (e) {
                  n(t, 0, e);
                }
              } else n(t, 0, "IndexedDB not available!");
            }
            var mr,
              dr,
              br = void 0;
            for (
              br = mr = _(Math.max(12, 1)), d(0 == (3 & mr)), dr = mr + 12;
              br < dr;
              br += 4
            )
              S[br >> 2] = 0;
            for (dr = mr + 12; br < dr; ) L[br++ >> 0] = 0;
            var yr = 1,
              vr = 0,
              gr = [],
              wr = [],
              Mr = null,
              kr = [];
            function zr(e) {
              for (var t = yr++, r = e.length; r < t; r++) e[r] = null;
              return t;
            }
            function Ar(e, t, r, n) {
              return (
                (e *= r),
                (n *= Math.floor((e + n - 1) / n)),
                0 >= t ? 0 : (t - 1) * n + e
              );
            }
            function xr(e, t, r, n, a) {
              switch (t) {
                case 6406:
                case 6409:
                case 6402:
                  t = 1;
                  break;
                case 6410:
                  t = 2;
                  break;
                case 6407:
                case 35904:
                  t = 3;
                  break;
                case 6408:
                case 35906:
                  t = 4;
                  break;
                default:
                  return vr || (vr = 1280), null;
              }
              switch (e) {
                case 5121:
                  t *= 1;
                  break;
                case 5123:
                case 36193:
                  t *= 2;
                  break;
                case 5125:
                case 5126:
                  t *= 4;
                  break;
                case 34042:
                  t = 4;
                  break;
                case 33635:
                case 32819:
                case 32820:
                  t = 2;
                  break;
                default:
                  return vr || (vr = 1280), null;
              }
              switch (((r = Ar(r, n, t, 4)), e)) {
                case 5121:
                  return E.subarray(a, a + r);
                case 5126:
                  return P.subarray(a >> 2, (a + r) >> 2);
                case 5125:
                case 34042:
                  return T.subarray(a >> 2, (a + r) >> 2);
                case 5123:
                case 33635:
                case 32819:
                case 32820:
                case 36193:
                  return O.subarray(a >> 1, (a + r) >> 1);
                default:
                  return vr || (vr = 1280), null;
              }
            }
            function Lr() {
              return Lr.l || (Lr.l = []), Lr.l.push(dn()), Lr.l.length - 1;
            }
            var Er = {},
              Cr = 1;
            function Or(e) {
              return 0 == e % 4 && (0 != e % 100 || 0 == e % 400);
            }
            function Sr(e, t) {
              for (var r = 0, n = 0; n <= t; r += e[n++]);
              return r;
            }
            var Tr,
              Pr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
              Ir = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            function Br(e, t) {
              for (e = new Date(e.getTime()); 0 < t; ) {
                var r = e.getMonth(),
                  n = (Or(e.getFullYear()) ? Pr : Ir)[r];
                if (!(t > n - e.getDate())) {
                  e.setDate(e.getDate() + t);
                  break;
                }
                (t -= n - e.getDate() + 1),
                  e.setDate(1),
                  11 > r
                    ? e.setMonth(r + 1)
                    : (e.setMonth(0), e.setFullYear(e.getFullYear() + 1));
              }
              return e;
            }
            function Fr(e, t, r, n) {
              function a(e, t, r) {
                for (
                  e = "number" == typeof e ? e.toString() : e || "";
                  e.length < t;

                )
                  e = r[0] + e;
                return e;
              }
              function i(e, t) {
                return a(e, t, "0");
              }
              function o(e, t) {
                function r(e) {
                  return 0 > e ? -1 : 0 < e ? 1 : 0;
                }
                var n;
                return (
                  0 === (n = r(e.getFullYear() - t.getFullYear())) &&
                    0 === (n = r(e.getMonth() - t.getMonth())) &&
                    (n = r(e.getDate() - t.getDate())),
                  n
                );
              }
              function s(e) {
                switch (e.getDay()) {
                  case 0:
                    return new Date(e.getFullYear() - 1, 11, 29);
                  case 1:
                    return e;
                  case 2:
                    return new Date(e.getFullYear(), 0, 3);
                  case 3:
                    return new Date(e.getFullYear(), 0, 2);
                  case 4:
                    return new Date(e.getFullYear(), 0, 1);
                  case 5:
                    return new Date(e.getFullYear() - 1, 11, 31);
                  case 6:
                    return new Date(e.getFullYear() - 1, 11, 30);
                }
              }
              function u(e) {
                e = Br(new Date(e.j + 1900, 0, 1), e.V);
                var t = s(new Date(e.getFullYear() + 1, 0, 4));
                return 0 >= o(s(new Date(e.getFullYear(), 0, 4)), e)
                  ? 0 >= o(t, e)
                    ? e.getFullYear() + 1
                    : e.getFullYear()
                  : e.getFullYear() - 1;
              }
              var _ = S[(n + 40) >> 2];
              for (var c in ((n = {
                Qa: S[n >> 2],
                Pa: S[(n + 4) >> 2],
                U: S[(n + 8) >> 2],
                H: S[(n + 12) >> 2],
                C: S[(n + 16) >> 2],
                j: S[(n + 20) >> 2],
                va: S[(n + 24) >> 2],
                V: S[(n + 28) >> 2],
                ad: S[(n + 32) >> 2],
                Oa: S[(n + 36) >> 2],
                Ra: _ ? g(_) : "",
              }),
              (r = g(r)),
              (_ = {
                "%c": "%a %b %d %H:%M:%S %Y",
                "%D": "%m/%d/%y",
                "%F": "%Y-%m-%d",
                "%h": "%b",
                "%r": "%I:%M:%S %p",
                "%R": "%H:%M",
                "%T": "%H:%M:%S",
                "%x": "%m/%d/%y",
                "%X": "%H:%M:%S",
              })))
                r = r.replace(new RegExp(c, "g"), _[c]);
              var f =
                  "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                    " "
                  ),
                l =
                  "January February March April May June July August September October November December".split(
                    " "
                  );
              for (c in (_ = {
                "%a": function (e) {
                  return f[e.va].substring(0, 3);
                },
                "%A": function (e) {
                  return f[e.va];
                },
                "%b": function (e) {
                  return l[e.C].substring(0, 3);
                },
                "%B": function (e) {
                  return l[e.C];
                },
                "%C": function (e) {
                  return i(((e.j + 1900) / 100) | 0, 2);
                },
                "%d": function (e) {
                  return i(e.H, 2);
                },
                "%e": function (e) {
                  return a(e.H, 2, " ");
                },
                "%g": function (e) {
                  return u(e).toString().substring(2);
                },
                "%G": function (e) {
                  return u(e);
                },
                "%H": function (e) {
                  return i(e.U, 2);
                },
                "%I": function (e) {
                  return (
                    0 == (e = e.U) ? (e = 12) : 12 < e && (e -= 12), i(e, 2)
                  );
                },
                "%j": function (e) {
                  return i(e.H + Sr(Or(e.j + 1900) ? Pr : Ir, e.C - 1), 3);
                },
                "%m": function (e) {
                  return i(e.C + 1, 2);
                },
                "%M": function (e) {
                  return i(e.Pa, 2);
                },
                "%n": function () {
                  return "\n";
                },
                "%p": function (e) {
                  return 0 <= e.U && 12 > e.U ? "AM" : "PM";
                },
                "%S": function (e) {
                  return i(e.Qa, 2);
                },
                "%t": function () {
                  return "\t";
                },
                "%u": function (e) {
                  return (
                    new Date(e.j + 1900, e.C + 1, e.H, 0, 0, 0, 0).getDay() || 7
                  );
                },
                "%U": function (e) {
                  var t = new Date(e.j + 1900, 0, 1),
                    r = 0 === t.getDay() ? t : Br(t, 7 - t.getDay());
                  return 0 > o(r, (e = new Date(e.j + 1900, e.C, e.H)))
                    ? i(
                        Math.ceil(
                          (31 -
                            r.getDate() +
                            (Sr(
                              Or(e.getFullYear()) ? Pr : Ir,
                              e.getMonth() - 1
                            ) -
                              31) +
                            e.getDate()) /
                            7
                        ),
                        2
                      )
                    : 0 === o(r, t)
                    ? "01"
                    : "00";
                },
                "%V": function (e) {
                  var t = s(new Date(e.j + 1900, 0, 4)),
                    r = s(new Date(e.j + 1901, 0, 4)),
                    n = Br(new Date(e.j + 1900, 0, 1), e.V);
                  return 0 > o(n, t)
                    ? "53"
                    : 0 >= o(r, n)
                    ? "01"
                    : i(
                        Math.ceil(
                          (t.getFullYear() < e.j + 1900
                            ? e.V + 32 - t.getDate()
                            : e.V + 1 - t.getDate()) / 7
                        ),
                        2
                      );
                },
                "%w": function (e) {
                  return new Date(
                    e.j + 1900,
                    e.C + 1,
                    e.H,
                    0,
                    0,
                    0,
                    0
                  ).getDay();
                },
                "%W": function (e) {
                  var t = new Date(e.j, 0, 1),
                    r =
                      1 === t.getDay()
                        ? t
                        : Br(t, 0 === t.getDay() ? 1 : 7 - t.getDay() + 1);
                  return 0 > o(r, (e = new Date(e.j + 1900, e.C, e.H)))
                    ? i(
                        Math.ceil(
                          (31 -
                            r.getDate() +
                            (Sr(
                              Or(e.getFullYear()) ? Pr : Ir,
                              e.getMonth() - 1
                            ) -
                              31) +
                            e.getDate()) /
                            7
                        ),
                        2
                      )
                    : 0 === o(r, t)
                    ? "01"
                    : "00";
                },
                "%y": function (e) {
                  return (e.j + 1900).toString().substring(2);
                },
                "%Y": function (e) {
                  return e.j + 1900;
                },
                "%z": function (e) {
                  var t = 0 <= (e = e.Oa);
                  return (
                    (e = Math.abs(e) / 60),
                    (t ? "+" : "-") +
                      String("0000" + ((e / 60) * 100 + (e % 60))).slice(-4)
                  );
                },
                "%Z": function (e) {
                  return e.Ra;
                },
                "%%": function () {
                  return "%";
                },
              }))
                0 <= r.indexOf(c) &&
                  (r = r.replace(new RegExp(c, "g"), _[c](n)));
              return (c = Rr(r, !1)).length > t
                ? 0
                : (L.set(c, e), c.length - 1);
            }
            (me =
              "undefined" != typeof dateNow
                ? dateNow
                : "object" == typeof self &&
                  self.performance &&
                  "function" == typeof self.performance.now
                ? function () {
                    return self.performance.now();
                  }
                : "object" == typeof performance &&
                  "function" == typeof performance.now
                ? function () {
                    return performance.now();
                  }
                : Date.now),
              mt(),
              (Ne = Array(4096)),
              ot(je, "/"),
              ut("/tmp"),
              ut("/home"),
              ut("/home/web_user"),
              (function () {
                if (
                  (ut("/dev"),
                  it(259, {
                    read: function () {
                      return 0;
                    },
                    write: function (e, t, r, n) {
                      return n;
                    },
                  }),
                  _t("/dev/null", 259),
                  Ie(1280, Fe),
                  Ie(1536, De),
                  _t("/dev/tty", 1280),
                  _t("/dev/tty1", 1536),
                  "undefined" != typeof crypto)
                )
                  var e = new Uint8Array(1),
                    t = function () {
                      return crypto.getRandomValues(e), e[0];
                    };
                else
                  t = function () {
                    yn("random_device");
                  };
                dt("random", t),
                  dt("urandom", t),
                  ut("/dev/shm"),
                  ut("/dev/shm/tmp");
              })(),
              ut("/proc"),
              ut("/proc/self"),
              ut("/proc/self/fd"),
              ot(
                {
                  A: function () {
                    var e = Qe("/proc/self", "fd", 16895, 73);
                    return (
                      (e.c = {
                        lookup: function (e, t) {
                          var r = qe[+t];
                          if (!r) throw new He(be.B);
                          return ((e = {
                            parent: null,
                            A: { ta: "fake" },
                            c: {
                              readlink: function () {
                                return r.path;
                              },
                            },
                          }).parent = e);
                        },
                      }),
                      e
                    );
                  },
                },
                "/proc/self/fd"
              ),
              K.unshift(function () {
                if (!t.noFSInit && !nt) {
                  d(
                    !nt,
                    "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"
                  ),
                    (nt = !0),
                    mt(),
                    (t.stdin = t.stdin),
                    (t.stdout = t.stdout),
                    (t.stderr = t.stderr),
                    t.stdin
                      ? dt("stdin", t.stdin)
                      : ct("/dev/tty", "/dev/stdin"),
                    t.stdout
                      ? dt("stdout", null, t.stdout)
                      : ct("/dev/tty", "/dev/stdout"),
                    t.stderr
                      ? dt("stderr", null, t.stderr)
                      : ct("/dev/tty1", "/dev/stderr");
                  var e = lt("/dev/stdin", "r");
                  d(0 === e.fd, "invalid handle for stdin (" + e.fd + ")"),
                    d(
                      1 === (e = lt("/dev/stdout", "w")).fd,
                      "invalid handle for stdout (" + e.fd + ")"
                    ),
                    d(
                      2 === (e = lt("/dev/stderr", "w")).fd,
                      "invalid handle for stderr (" + e.fd + ")"
                    );
                }
              }),
              J.push(function () {
                Ue = !1;
              }),
              Q.push(function () {
                nt = !1;
                var e = t._fflush;
                for (e && e(0), e = 0; e < qe.length; e++) {
                  var r = qe[e];
                  r && pt(r);
                }
              }),
              K.unshift(function () {}),
              Q.push(function () {}),
              (t.requestFullScreen = function (e, r, n) {
                u(
                  "Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead."
                ),
                  (t.requestFullScreen = t.requestFullscreen),
                  Xt(e, r, n);
              }),
              (t.requestFullscreen = function (e, t, r) {
                Yt(e, t, r);
              }),
              (t.requestAnimationFrame = function (e) {
                Qt(e);
              }),
              (t.setCanvasSize = function (e, r, n) {
                nr(t.canvas, e, r), n || rr();
              }),
              (t.pauseMainLoop = function () {
                (St = null), Pt++;
              }),
              (t.resumeMainLoop = function () {
                Pt++;
                var e = Ft,
                  t = Dt,
                  r = It;
                (It = null), Lt(r, 0, !1, Bt, !0), xt(e, t), St();
              }),
              (t.getUserMedia = function () {
                window.getUserMedia ||
                  (window.getUserMedia =
                    navigator.getUserMedia || navigator.mozGetUserMedia),
                  window.getUserMedia(void 0);
              }),
              (t.createContext = function (e, t, r, n) {
                return Ut(e, t, r, n);
              }),
              (Tr = "undefined" == typeof ENVIRONMENT_IS_FETCH_WORKER),
              (function (e, t) {
                try {
                  var r = indexedDB.open("emscripten_filesystem", 1);
                } catch (e) {
                  return void t();
                }
                (r.onupgradeneeded = function (e) {
                  (e = e.target.result).objectStoreNames.contains("FILES") &&
                    e.deleteObjectStore("FILES"),
                    e.createObjectStore("FILES");
                }),
                  (r.onsuccess = function (t) {
                    e(t.target.result);
                  }),
                  (r.onerror = function (e) {
                    t();
                  });
              })(
                function (e) {
                  (_r = e), Tr && ce();
                },
                function () {
                  (_r = !1), Tr && ce();
                }
              ),
              ("undefined" != typeof ENVIRONMENT_IS_FETCH_WORKER &&
                ENVIRONMENT_IS_FETCH_WORKER) ||
                _e();
            for (var Dr, jr = 0; 256 > jr; jr++);
            for (jr = 0; 32 > jr; jr++) kr.push(Array(jr));
            function Rr(e, t) {
              var r = Array(A(e) + 1);
              return (e = z(e, r, 0, r.length)), t && (r.length = e), r;
            }
            (V = _(4)),
              (F = D = f(B)),
              (R = f((j = F + H))),
              (S[V >> 2] = R),
              (t.wasmTableSize = 2468),
              (t.wasmMaxTableSize = 2468),
              (t.Aa = {}),
              (t.Ba = {
                abort: yn,
                assert: d,
                enlargeMemory: W,
                getTotalMemory: function () {
                  return Z;
                },
                abortOnCannotGrowMemory: function () {
                  yn(
                    "Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " +
                      Z +
                      ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "
                  );
                },
                invoke_i: function (e) {
                  var r = dn();
                  try {
                    return t.dynCall_i(e);
                  } catch (e) {
                    if ((mn(r), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_ii: function (e, r) {
                  var n = dn();
                  try {
                    return t.dynCall_ii(e, r);
                  } catch (e) {
                    if ((mn(n), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iii: function (e, r, n) {
                  var a = dn();
                  try {
                    return t.dynCall_iii(e, r, n);
                  } catch (e) {
                    if ((mn(a), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiii: function (e, r, n, a) {
                  var i = dn();
                  try {
                    return t.dynCall_iiii(e, r, n, a);
                  } catch (e) {
                    if ((mn(i), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiiii: function (e, r, n, a, i) {
                  var o = dn();
                  try {
                    return t.dynCall_iiiii(e, r, n, a, i);
                  } catch (e) {
                    if ((mn(o), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiiiid: function (e, r, n, a, i, o) {
                  var s = dn();
                  try {
                    return t.dynCall_iiiiid(e, r, n, a, i, o);
                  } catch (e) {
                    if ((mn(s), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiiiii: function (e, r, n, a, i, o) {
                  var s = dn();
                  try {
                    return t.dynCall_iiiiii(e, r, n, a, i, o);
                  } catch (e) {
                    if ((mn(s), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiiiiid: function (e, r, n, a, i, o, s) {
                  var u = dn();
                  try {
                    return t.dynCall_iiiiiid(e, r, n, a, i, o, s);
                  } catch (e) {
                    if ((mn(u), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiiiiii: function (e, r, n, a, i, o, s) {
                  var u = dn();
                  try {
                    return t.dynCall_iiiiiii(e, r, n, a, i, o, s);
                  } catch (e) {
                    if ((mn(u), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiiiiiii: function (e, r, n, a, i, o, s, u) {
                  var _ = dn();
                  try {
                    return t.dynCall_iiiiiiii(e, r, n, a, i, o, s, u);
                  } catch (e) {
                    if ((mn(_), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiiiiiiii: function (e, r, n, a, i, o, s, u, _) {
                  var c = dn();
                  try {
                    return t.dynCall_iiiiiiiii(e, r, n, a, i, o, s, u, _);
                  } catch (e) {
                    if ((mn(c), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiiiij: function (e, r, n, a, i, o, s) {
                  var u = dn();
                  try {
                    return t.dynCall_iiiiij(e, r, n, a, i, o, s);
                  } catch (e) {
                    if ((mn(u), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_iiji: function (e, r, n, a, i) {
                  var o = dn();
                  try {
                    return t.dynCall_iiji(e, r, n, a, i);
                  } catch (e) {
                    if ((mn(o), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_v: function (e) {
                  var r = dn();
                  try {
                    t.dynCall_v(e);
                  } catch (e) {
                    if ((mn(r), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_vi: function (e, r) {
                  var n = dn();
                  try {
                    t.dynCall_vi(e, r);
                  } catch (e) {
                    if ((mn(n), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_vii: function (e, r, n) {
                  var a = dn();
                  try {
                    t.dynCall_vii(e, r, n);
                  } catch (e) {
                    if ((mn(a), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viiffii: function (e, r, n, a, i, o, s) {
                  var u = dn();
                  try {
                    t.dynCall_viiffii(e, r, n, a, i, o, s);
                  } catch (e) {
                    if ((mn(u), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viii: function (e, r, n, a) {
                  var i = dn();
                  try {
                    t.dynCall_viii(e, r, n, a);
                  } catch (e) {
                    if ((mn(i), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viiifffii: function (e, r, n, a, i, o, s, u, _) {
                  var c = dn();
                  try {
                    t.dynCall_viiifffii(e, r, n, a, i, o, s, u, _);
                  } catch (e) {
                    if ((mn(c), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viiiffii: function (e, r, n, a, i, o, s, u) {
                  var _ = dn();
                  try {
                    t.dynCall_viiiffii(e, r, n, a, i, o, s, u);
                  } catch (e) {
                    if ((mn(_), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viiii: function (e, r, n, a, i) {
                  var o = dn();
                  try {
                    t.dynCall_viiii(e, r, n, a, i);
                  } catch (e) {
                    if ((mn(o), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viiiii: function (e, r, n, a, i, o) {
                  var s = dn();
                  try {
                    t.dynCall_viiiii(e, r, n, a, i, o);
                  } catch (e) {
                    if ((mn(s), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viiiiiffffffffffffffff: function (
                  e,
                  r,
                  n,
                  a,
                  i,
                  o,
                  s,
                  u,
                  _,
                  c,
                  f,
                  l,
                  p,
                  h,
                  m,
                  d,
                  b,
                  y,
                  v,
                  g,
                  w,
                  M
                ) {
                  var k = dn();
                  try {
                    t.dynCall_viiiiiffffffffffffffff(
                      e,
                      r,
                      n,
                      a,
                      i,
                      o,
                      s,
                      u,
                      _,
                      c,
                      f,
                      l,
                      p,
                      h,
                      m,
                      d,
                      b,
                      y,
                      v,
                      g,
                      w,
                      M
                    );
                  } catch (e) {
                    if ((mn(k), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viiiiii: function (e, r, n, a, i, o, s) {
                  var u = dn();
                  try {
                    t.dynCall_viiiiii(e, r, n, a, i, o, s);
                  } catch (e) {
                    if ((mn(u), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viijii: function (e, r, n, a, i, o, s) {
                  var u = dn();
                  try {
                    t.dynCall_viijii(e, r, n, a, i, o, s);
                  } catch (e) {
                    if ((mn(u), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_vij: function (e, r, n, a) {
                  var i = dn();
                  try {
                    t.dynCall_vij(e, r, n, a);
                  } catch (e) {
                    if ((mn(i), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_viji: function (e, r, n, a, i) {
                  var o = dn();
                  try {
                    t.dynCall_viji(e, r, n, a, i);
                  } catch (e) {
                    if ((mn(o), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                invoke_vijii: function (e, r, n, a, i, o) {
                  var s = dn();
                  try {
                    t.dynCall_vijii(e, r, n, a, i, o);
                  } catch (e) {
                    if ((mn(s), "number" != typeof e && "longjmp" !== e))
                      throw e;
                    t.setThrew(1, 0);
                  }
                },
                ___buildEnvironment: function e(r) {
                  if (e.Da)
                    var n = S[r >> 2],
                      a = S[n >> 2];
                  else
                    (e.Da = !0),
                      (he.USER = he.LOGNAME = "web_user"),
                      (he.PATH = "/"),
                      (he.PWD = "/"),
                      (he.HOME = "/home/web_user"),
                      (he.LANG = "C.UTF-8"),
                      (he._ = t.thisProgram),
                      (a = ee ? ln(1024) : c(1024)),
                      (n = ee ? ln(256) : c(256)),
                      (S[n >> 2] = a),
                      (S[r >> 2] = n);
                  r = [];
                  var i,
                    o = 0;
                  for (i in he)
                    if ("string" == typeof he[i]) {
                      var s = i + "=" + he[i];
                      r.push(s), (o += s.length);
                    }
                  if (1024 < o)
                    throw Error("Environment size exceeded TOTAL_ENV_SIZE!");
                  for (i = 0; i < r.length; i++) {
                    o = s = r[i];
                    for (var u = a, _ = 0; _ < o.length; ++_)
                      L[u++ >> 0] = o.charCodeAt(_);
                    (L[u >> 0] = 0),
                      (S[(n + 4 * i) >> 2] = a),
                      (a += s.length + 1);
                  }
                  S[(n + 4 * r.length) >> 2] = 0;
                },
                ___clock_gettime: function () {
                  return ve.apply(null, arguments);
                },
                ___cxa_allocate_exception: function (e) {
                  return ln(e);
                },
                ___cxa_begin_catch: function (e) {
                  var t = Me[e];
                  return (
                    t && !t.ma && ((t.ma = !0), un.$--),
                    t && (t.L = !1),
                    we.push(e),
                    (t = ke(e)) && Me[t].J++,
                    e
                  );
                },
                ___cxa_current_primary_exception: function () {
                  var e = we[we.length - 1] || 0;
                  if (e) {
                    var t = ke(e);
                    t && Me[t].J++;
                  }
                  return e;
                },
                ___cxa_decrement_exception_refcount: function (e) {
                  ze(ke(e));
                },
                ___cxa_end_catch: function () {
                  t.setThrew(0);
                  var e = we.pop();
                  e && (ze(ke(e)), (ge = 0));
                },
                ___cxa_find_matching_catch: function e() {
                  var r = ge;
                  if (!r) return 0 | (pn(0), 0);
                  var n = Me[r],
                    a = n.type;
                  if (!a) return 0 | (pn(0), r);
                  var i = Array.prototype.slice.call(arguments);
                  t.___cxa_is_pointer_type(a),
                    e.buffer || (e.buffer = ln(4)),
                    (S[e.buffer >> 2] = r),
                    (r = e.buffer);
                  for (var o = 0; o < i.length; o++)
                    if (i[o] && t.___cxa_can_catch(i[o], a, r))
                      return (r = S[r >> 2]), (n.ka = r), 0 | (pn(i[o]), r);
                  return (r = S[r >> 2]), 0 | (pn(a), r);
                },
                ___cxa_free_exception: Ae,
                ___cxa_increment_exception_refcount: function (e) {
                  (e = ke(e)) && Me[e].J++;
                },
                ___cxa_pure_virtual: function () {
                  throw ((m = !0), "Pure virtual function called!");
                },
                ___cxa_rethrow: xe,
                ___cxa_rethrow_primary_exception: function (e) {
                  e && (we.push(e), (Me[e].L = !0), xe());
                },
                ___cxa_throw: function (e, t, r) {
                  throw (
                    ((Me[e] = {
                      Ka: e,
                      ka: e,
                      type: t,
                      oa: r,
                      J: 0,
                      ma: !1,
                      L: !1,
                    }),
                    (ge = e),
                    "uncaught_exception" in un ? un.$++ : (un.$ = 1),
                    e +
                      " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.")
                  );
                },
                ___cxa_uncaught_exception: function () {
                  return !!un.$;
                },
                ___gxx_personality_v0: function () {},
                ___lock: function () {},
                ___map_file: function () {
                  return ye(be.I), -1;
                },
                ___resumeException: function (e) {
                  throw (
                    (ge || (ge = e),
                    e +
                      " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.")
                  );
                },
                ___setErrNo: ye,
                ___syscall140: function (e, t) {
                  kt = t;
                  try {
                    var r = At();
                    zt();
                    var n = zt(),
                      a = zt(),
                      i = zt();
                    return (
                      ht(r, n, i),
                      (S[a >> 2] = r.position),
                      r.ba && 0 === n && 0 === i && (r.ba = null),
                      0
                    );
                  } catch (e) {
                    return (void 0 !== wt && e instanceof He) || yn(e), -e.v;
                  }
                },
                ___syscall145: function (e, t) {
                  kt = t;
                  try {
                    var r = At(),
                      n = zt();
                    e: {
                      var a = zt();
                      for (t = e = 0; t < a; t++) {
                        var i = S[(n + (8 * t + 4)) >> 2],
                          o = r,
                          s = S[(n + 8 * t) >> 2],
                          u = i,
                          _ = void 0,
                          c = L;
                        if (0 > u || 0 > _) throw new He(be.i);
                        if (null === o.fd) throw new He(be.B);
                        if (1 == (2097155 & o.flags)) throw new He(be.B);
                        if (16384 == (61440 & o.node.mode)) throw new He(be.N);
                        if (!o.f.read) throw new He(be.i);
                        var f = void 0 !== _;
                        if (f) {
                          if (!o.seekable) throw new He(be.O);
                        } else _ = o.position;
                        var l = o.f.read(o, c, s, u, _);
                        f || (o.position += l);
                        var p = l;
                        if (0 > p) {
                          var h = -1;
                          break e;
                        }
                        if (((e += p), p < i)) break;
                      }
                      h = e;
                    }
                    return h;
                  } catch (e) {
                    return (void 0 !== wt && e instanceof He) || yn(e), -e.v;
                  }
                },
                ___syscall146: function (e, t) {
                  kt = t;
                  try {
                    var r = At(),
                      n = zt();
                    e: {
                      var a = zt();
                      for (t = e = 0; t < a; t++) {
                        var i = r,
                          o = S[(n + 8 * t) >> 2],
                          s = S[(n + (8 * t + 4)) >> 2],
                          u = L,
                          _ = void 0;
                        if (0 > s || 0 > _) throw new He(be.i);
                        if (null === i.fd) throw new He(be.B);
                        if (0 == (2097155 & i.flags)) throw new He(be.B);
                        if (16384 == (61440 & i.node.mode)) throw new He(be.N);
                        if (!i.f.write) throw new He(be.i);
                        1024 & i.flags && ht(i, 0, 2);
                        var c = void 0 !== _;
                        if (c) {
                          if (!i.seekable) throw new He(be.O);
                        } else _ = i.position;
                        var f = i.f.write(i, u, o, s, _, void 0);
                        c || (i.position += f);
                        try {
                          i.path &&
                            We.onWriteToFile &&
                            We.onWriteToFile(i.path);
                        } catch (e) {
                          console.log(
                            "FS.trackingDelegate['onWriteToFile']('" +
                              path +
                              "') threw an exception: " +
                              e.message
                          );
                        }
                        var l = f;
                        if (0 > l) {
                          var p = -1;
                          break e;
                        }
                        e += l;
                      }
                      p = e;
                    }
                    return p;
                  } catch (e) {
                    return (void 0 !== wt && e instanceof He) || yn(e), -e.v;
                  }
                },
                ___syscall196: function (e, t) {
                  kt = t;
                  try {
                    var r = g(zt());
                    e: {
                      var n = zt();
                      try {
                        var a = Ye(r, { aa: !1 }).node;
                        if (!a) throw new He(be.u);
                        if (!a.c.m) throw new He(be.I);
                        var i = a.c.m(a);
                      } catch (e) {
                        if (e && e.node && Ce(r) !== Ce(Xe(e.node))) {
                          var o = -be.Z;
                          break e;
                        }
                        throw e;
                      }
                      (S[n >> 2] = i.dev),
                        (S[(n + 4) >> 2] = 0),
                        (S[(n + 8) >> 2] = i.ino),
                        (S[(n + 12) >> 2] = i.mode),
                        (S[(n + 16) >> 2] = i.nlink),
                        (S[(n + 20) >> 2] = i.uid),
                        (S[(n + 24) >> 2] = i.gid),
                        (S[(n + 28) >> 2] = i.rdev),
                        (S[(n + 32) >> 2] = 0),
                        (S[(n + 36) >> 2] = i.size),
                        (S[(n + 40) >> 2] = 4096),
                        (S[(n + 44) >> 2] = i.blocks),
                        (S[(n + 48) >> 2] = (i.atime.getTime() / 1e3) | 0),
                        (S[(n + 52) >> 2] = 0),
                        (S[(n + 56) >> 2] = (i.mtime.getTime() / 1e3) | 0),
                        (S[(n + 60) >> 2] = 0),
                        (S[(n + 64) >> 2] = (i.ctime.getTime() / 1e3) | 0),
                        (S[(n + 68) >> 2] = 0),
                        (S[(n + 72) >> 2] = i.ino),
                        (o = 0);
                    }
                    return o;
                  } catch (e) {
                    return (void 0 !== wt && e instanceof He) || yn(e), -e.v;
                  }
                },
                ___syscall221: function (e, t) {
                  kt = t;
                  try {
                    var r = At();
                    switch (zt()) {
                      case 0:
                        var n = zt();
                        return 0 > n ? -be.i : lt(r.path, r.flags, 0, n).fd;
                      case 1:
                      case 2:
                        return 0;
                      case 3:
                        return r.flags;
                      case 4:
                        return (n = zt()), (r.flags |= n), 0;
                      case 12:
                      case 12:
                        return (n = zt()), (C[(n + 0) >> 1] = 2), 0;
                      case 13:
                      case 14:
                      case 13:
                      case 14:
                        return 0;
                      case 16:
                      case 8:
                        return -be.i;
                      case 9:
                        return ye(be.i), -1;
                      default:
                        return -be.i;
                    }
                  } catch (e) {
                    return (void 0 !== wt && e instanceof He) || yn(e), -e.v;
                  }
                },
                ___syscall5: function (e, t) {
                  kt = t;
                  try {
                    return lt(g(zt()), zt(), zt()).fd;
                  } catch (e) {
                    return (void 0 !== wt && e instanceof He) || yn(e), -e.v;
                  }
                },
                ___syscall54: function (e, t) {
                  kt = t;
                  try {
                    var r = At(),
                      n = zt();
                    switch (n) {
                      case 21509:
                      case 21505:
                        return r.tty ? 0 : -be.D;
                      case 21510:
                      case 21511:
                      case 21512:
                      case 21506:
                      case 21507:
                      case 21508:
                        return r.tty ? 0 : -be.D;
                      case 21519:
                        if (!r.tty) return -be.D;
                        var a = zt();
                        return (S[a >> 2] = 0);
                      case 21520:
                        return r.tty ? -be.i : -be.D;
                      case 21531:
                        if (((e = a = zt()), !r.f.Ha)) throw new He(be.D);
                        return r.f.Ha(r, n, e);
                      case 21523:
                      case 21524:
                        return r.tty ? 0 : -be.D;
                      default:
                        yn("bad ioctl syscall " + n);
                    }
                  } catch (e) {
                    return (void 0 !== wt && e instanceof He) || yn(e), -e.v;
                  }
                },
                ___syscall6: function (e, t) {
                  kt = t;
                  try {
                    return pt(At()), 0;
                  } catch (e) {
                    return (void 0 !== wt && e instanceof He) || yn(e), -e.v;
                  }
                },
                ___syscall91: function (e, t) {
                  kt = t;
                  try {
                    var r = zt(),
                      n = zt(),
                      a = Mt[r];
                    if (!a) return 0;
                    if (n === a.Xc) {
                      var i = qe[a.fd],
                        o = a.flags,
                        s = new Uint8Array(E.subarray(r, r + n));
                      i && i.f.T && i.f.T(i, s, 0, n, o),
                        (Mt[r] = null),
                        a.za && fn(a.Yc);
                    }
                    return 0;
                  } catch (e) {
                    return (void 0 !== wt && e instanceof He) || yn(e), -e.v;
                  }
                },
                ___unlock: function () {},
                __addDays: Br,
                __arraySum: Sr,
                __emscripten_fetch_cache_data: lr,
                __emscripten_fetch_delete_cached_data: hr,
                __emscripten_fetch_load_cached_data: pr,
                __emscripten_fetch_xhr: fr,
                __emscripten_get_fetch_work_queue: function () {
                  return mr;
                },
                __isLeapYear: Or,
                _abort: function () {
                  t.abort();
                },
                _clock_gettime: ve,
                _emidentity: function () {
                  var e = new URL(location.origin).hostname;
                  if (
                    (0 === e.length &&
                      (e = new URL(location.href.replace("blob:", ""))
                        .hostname),
                    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                      e
                    ))
                  )
                    0 === e.indexOf("10.") && (e = "10.*"),
                      0 === e.indexOf("192.168.") && (e = "192.168.*"),
                      0 === e.indexOf("127.") && (e = "127.*");
                  else {
                    var t = new RegExp(
                      "(" +
                        String.fromCharCode(92) +
                        ".ngrok" +
                        String.fromCharCode(92) +
                        ".io)$",
                      "i"
                    );
                    t.test(e) && (e = "*.ngrok.io"),
                      (t = new RegExp(
                        "(" +
                          String.fromCharCode(92) +
                          ".arweb" +
                          String.fromCharCode(92) +
                          ".app)$",
                        "i"
                      )).test(e) && (e = "*.arweb.app");
                  }
                  t = A(e) + 1;
                  var r = ln(t);
                  return z(e, E, r, t + 1), r;
                },
                _emscripten_asm_const_i: function (e) {
                  return le[e]();
                },
                _emscripten_async_call: function (e, r, n) {
                  function a() {
                    !(function (e) {
                      if (e) {
                        d("vi"), h.vi || (h.vi = {});
                        var r = h.vi;
                        return (
                          r[e] ||
                            (r[e] = function (r) {
                              return (function (e, r, n) {
                                return n && n.length
                                  ? t["dynCall_" + e].apply(null, [r].concat(n))
                                  : t["dynCall_" + e].call(null, r);
                              })("vi", e, [r]);
                            }),
                          r[e]
                        );
                      }
                    })(e)(r);
                  }
                  (t.noExitRuntime = !0),
                    0 <= n
                      ? $t(a, n)
                      : (function (e) {
                          Qt(function () {
                            m || e();
                          });
                        })(a);
                },
                _emscripten_get_now: me,
                _emscripten_get_now_is_monotonic: de,
                _emscripten_is_main_browser_thread: function () {
                  return !1;
                },
                _emscripten_is_main_runtime_thread: function () {
                  return 1;
                },
                _emscripten_memcpy_big: function (e, t, r) {
                  return E.set(E.subarray(t, t + r), e), e;
                },
                _emscripten_set_main_loop: Lt,
                _emscripten_set_main_loop_timing: xt,
                _emscripten_start_fetch: function (e, r, n, a) {
                  function i(e) {
                    l ? t.dynCall_vi(l, e) : n && n(e);
                  }
                  function o(e) {
                    p ? t.dynCall_vi(p, e) : a && a(e);
                  }
                  function s(e, n) {
                    lr(
                      _r,
                      e,
                      n.response,
                      function (e) {
                        f ? t.dynCall_vi(f, e) : r && r(e);
                      },
                      function (e) {
                        f ? t.dynCall_vi(f, e) : r && r(e);
                      }
                    );
                  }
                  function u(e) {
                    f ? t.dynCall_vi(f, e) : r && r(e);
                  }
                  void 0 !== t && (t.noExitRuntime = !0);
                  var _ = e + 112,
                    c = g(_),
                    f = T[(_ + 36) >> 2],
                    l = T[(_ + 40) >> 2],
                    p = T[(_ + 44) >> 2],
                    h = T[(_ + 48) >> 2],
                    m = !!(4 & h),
                    d = !!(32 & h);
                  if (16 & h && "EM_IDB_STORE" !== c && "EM_IDB_DELETE" !== c) {
                    if (d) return 0;
                    fr(e, m ? s : u, i, o);
                  } else {
                    if (!_r) return i(e), 0;
                    "EM_IDB_STORE" === c
                      ? ((c = T[(_ + 80) >> 2]),
                        (_ = E.slice(c, c + T[(_ + 84) >> 2])),
                        lr(_r, e, _, u, i))
                      : "EM_IDB_DELETE" === c
                      ? hr(_r, e, u, i)
                      : pr(
                          _r,
                          e,
                          u,
                          d
                            ? i
                            : m
                            ? function (e) {
                                fr(e, s, i, o);
                              }
                            : function (e) {
                                fr(e, u, i, o);
                              }
                        );
                  }
                  return e;
                },
                _getenv: function e(t) {
                  if (0 === t) return 0;
                  if (((t = g(t)), !he.hasOwnProperty(t))) return 0;
                  e.l && fn(e.l);
                  var r = A((t = he[t])) + 1,
                    n = ln(r);
                  return n && z(t, L, n, r), (e.l = n);
                },
                _gettimeofday: function (e) {
                  var t = Date.now();
                  return (
                    (S[e >> 2] = (t / 1e3) | 0),
                    (S[(e + 4) >> 2] = ((t % 1e3) * 1e3) | 0),
                    0
                  );
                },
                _glBindTexture: function (e, t) {
                  Dr.bindTexture(e, t ? gr[t] : null);
                },
                _glGenTextures: function (e, t) {
                  for (var r = 0; r < e; r++) {
                    var n = Dr.createTexture();
                    if (!n) {
                      for (vr || (vr = 1282); r < e; )
                        S[(t + 4 * r++) >> 2] = 0;
                      break;
                    }
                    var a = zr(gr);
                    (n.name = a), (gr[a] = n), (S[(t + 4 * r) >> 2] = a);
                  }
                },
                _glTexImage2D: function (e, t, r, n, a, i, o, s, u) {
                  var _ = null;
                  u && (_ = xr(s, o, n, a, u)),
                    Dr.texImage2D(e, t, r, n, a, i, o, s, _);
                },
                _glTexParameteri: function (e, t, r) {
                  Dr.texParameteri(e, t, r);
                },
                _llvm_exp2_f32: function (e) {
                  return Math.pow(2, e);
                },
                _llvm_stackrestore: function (e) {
                  var t = Lr.l[e];
                  Lr.l.splice(e, 1), mn(t);
                },
                _llvm_stacksave: Lr,
                _llvm_trap: function () {
                  yn("trap!");
                },
                _pthread_cond_destroy: function () {
                  return 0;
                },
                _pthread_cond_init: function () {
                  return 0;
                },
                _pthread_cond_signal: function () {
                  return 0;
                },
                _pthread_cond_wait: function () {
                  return 0;
                },
                _pthread_create: function () {
                  return 11;
                },
                _pthread_getspecific: function (e) {
                  return Er[e] || 0;
                },
                _pthread_join: function () {},
                _pthread_key_create: function (e) {
                  return 0 == e
                    ? be.i
                    : ((S[e >> 2] = Cr), (Er[Cr] = 0), Cr++, 0);
                },
                _pthread_mutex_destroy: function () {},
                _pthread_mutex_init: function () {},
                _pthread_once: function e(r, n) {
                  e.l || (e.l = {}), r in e.l || (t.dynCall_v(n), (e.l[r] = 1));
                },
                _pthread_setspecific: function (e, t) {
                  return e in Er ? ((Er[e] = t), 0) : be.i;
                },
                _strftime: Fr,
                _strftime_l: function (e, t, r, n) {
                  return Fr(e, t, r, n);
                },
                _sysconf: function (e) {
                  switch (e) {
                    case 30:
                      return 16384;
                    case 85:
                      return 131068;
                    case 132:
                    case 133:
                    case 12:
                    case 137:
                    case 138:
                    case 15:
                    case 235:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 149:
                    case 13:
                    case 10:
                    case 236:
                    case 153:
                    case 9:
                    case 21:
                    case 22:
                    case 159:
                    case 154:
                    case 14:
                    case 77:
                    case 78:
                    case 139:
                    case 80:
                    case 81:
                    case 82:
                    case 68:
                    case 67:
                    case 164:
                    case 11:
                    case 29:
                    case 47:
                    case 48:
                    case 95:
                    case 52:
                    case 51:
                    case 46:
                      return 200809;
                    case 79:
                      return 0;
                    case 27:
                    case 246:
                    case 127:
                    case 128:
                    case 23:
                    case 24:
                    case 160:
                    case 161:
                    case 181:
                    case 182:
                    case 242:
                    case 183:
                    case 184:
                    case 243:
                    case 244:
                    case 245:
                    case 165:
                    case 178:
                    case 179:
                    case 49:
                    case 50:
                    case 168:
                    case 169:
                    case 175:
                    case 170:
                    case 171:
                    case 172:
                    case 97:
                    case 76:
                    case 32:
                    case 173:
                    case 35:
                      return -1;
                    case 176:
                    case 177:
                    case 7:
                    case 155:
                    case 8:
                    case 157:
                    case 125:
                    case 126:
                    case 92:
                    case 93:
                    case 129:
                    case 130:
                    case 131:
                    case 94:
                    case 91:
                      return 1;
                    case 74:
                    case 60:
                    case 69:
                    case 70:
                    case 4:
                      return 1024;
                    case 31:
                    case 42:
                    case 72:
                      return 32;
                    case 87:
                    case 26:
                    case 33:
                      return 2147483647;
                    case 34:
                    case 1:
                      return 47839;
                    case 38:
                    case 36:
                      return 99;
                    case 43:
                    case 37:
                      return 2048;
                    case 0:
                      return 2097152;
                    case 3:
                      return 65536;
                    case 28:
                      return 32768;
                    case 44:
                      return 32767;
                    case 75:
                      return 16384;
                    case 39:
                      return 1e3;
                    case 89:
                      return 700;
                    case 71:
                      return 256;
                    case 40:
                      return 255;
                    case 2:
                      return 100;
                    case 180:
                      return 64;
                    case 25:
                      return 20;
                    case 5:
                      return 16;
                    case 6:
                      return 6;
                    case 73:
                      return 4;
                    case 84:
                      return (
                        ("object" == typeof navigator &&
                          navigator.hardwareConcurrency) ||
                        1
                      );
                  }
                  return ye(be.i), -1;
                },
                emscriptenWebGLComputeImageSize: Ar,
                emscriptenWebGLGetTexPixelData: xr,
                DYNAMICTOP_PTR: V,
                tempDoublePtr: pe,
                STACKTOP: D,
                STACK_MAX: j,
              });
            var Vr = t.asm(t.Aa, t.Ba, x);
            t.asm = Vr;
            var qr = (t.__GLOBAL__I_000101 = function () {
                return t.asm.__GLOBAL__I_000101.apply(null, arguments);
              }),
              Gr = (t.__GLOBAL__sub_I_AZHighLevelEncoder_cpp = function () {
                return t.asm.__GLOBAL__sub_I_AZHighLevelEncoder_cpp.apply(
                  null,
                  arguments
                );
              }),
              Nr = (t.__GLOBAL__sub_I_CameraSource_cpp = function () {
                return t.asm.__GLOBAL__sub_I_CameraSource_cpp.apply(
                  null,
                  arguments
                );
              }),
              Ur = (t.__GLOBAL__sub_I_CharacterSetECI_cpp = function () {
                return t.asm.__GLOBAL__sub_I_CharacterSetECI_cpp.apply(
                  null,
                  arguments
                );
              }),
              Wr = (t.__GLOBAL__sub_I_DMECEncoder_cpp = function () {
                return t.asm.__GLOBAL__sub_I_DMECEncoder_cpp.apply(
                  null,
                  arguments
                );
              }),
              Hr = (t.__GLOBAL__sub_I_DMHighLevelEncoder_cpp = function () {
                return t.asm.__GLOBAL__sub_I_DMHighLevelEncoder_cpp.apply(
                  null,
                  arguments
                );
              }),
              Zr = (t.__GLOBAL__sub_I_GridSampler_cpp = function () {
                return t.asm.__GLOBAL__sub_I_GridSampler_cpp.apply(
                  null,
                  arguments
                );
              }),
              Yr = (t.__GLOBAL__sub_I_ODCode128Patterns_cpp = function () {
                return t.asm.__GLOBAL__sub_I_ODCode128Patterns_cpp.apply(
                  null,
                  arguments
                );
              }),
              Xr = (t.__GLOBAL__sub_I_ODRSSExpandedReader_cpp = function () {
                return t.asm.__GLOBAL__sub_I_ODRSSExpandedReader_cpp.apply(
                  null,
                  arguments
                );
              }),
              Kr = (t.__GLOBAL__sub_I_PDFDetector_cpp = function () {
                return t.asm.__GLOBAL__sub_I_PDFDetector_cpp.apply(
                  null,
                  arguments
                );
              }),
              Jr = (t.__GLOBAL__sub_I_StandardStatsManager_cpp = function () {
                return t.asm.__GLOBAL__sub_I_StandardStatsManager_cpp.apply(
                  null,
                  arguments
                );
              }),
              Qr = (t.__GLOBAL__sub_I_barcode_finder_cpp = function () {
                return t.asm.__GLOBAL__sub_I_barcode_finder_cpp.apply(
                  null,
                  arguments
                );
              }),
              $r = (t.__GLOBAL__sub_I_face_landmark_cpp = function () {
                return t.asm.__GLOBAL__sub_I_face_landmark_cpp.apply(
                  null,
                  arguments
                );
              }),
              en = (t.__GLOBAL__sub_I_face_mesh_cpp = function () {
                return t.asm.__GLOBAL__sub_I_face_mesh_cpp.apply(
                  null,
                  arguments
                );
              }),
              tn = (t.__GLOBAL__sub_I_face_tracker_cpp = function () {
                return t.asm.__GLOBAL__sub_I_face_tracker_cpp.apply(
                  null,
                  arguments
                );
              }),
              rn = (t.__GLOBAL__sub_I_image_tracker_cpp = function () {
                return t.asm.__GLOBAL__sub_I_image_tracker_cpp.apply(
                  null,
                  arguments
                );
              }),
              nn = (t.__GLOBAL__sub_I_instant_tracker_cpp = function () {
                return t.asm.__GLOBAL__sub_I_instant_tracker_cpp.apply(
                  null,
                  arguments
                );
              }),
              an = (t.__GLOBAL__sub_I_iostream_cpp = function () {
                return t.asm.__GLOBAL__sub_I_iostream_cpp.apply(
                  null,
                  arguments
                );
              }),
              on = (t.__GLOBAL__sub_I_pipeline_cpp = function () {
                return t.asm.__GLOBAL__sub_I_pipeline_cpp.apply(
                  null,
                  arguments
                );
              }),
              sn = (t.__GLOBAL__sub_I_zappar_face_tracker_cpp = function () {
                return t.asm.__GLOBAL__sub_I_zappar_face_tracker_cpp.apply(
                  null,
                  arguments
                );
              });
            (t.__Z20zappar_face_mesh_uvsP19zappar_face_mesh_ti = function () {
              return t.asm.__Z20zappar_face_mesh_uvsP19zappar_face_mesh_ti.apply(
                null,
                arguments
              );
            }),
              (t.__Z23zappar_face_mesh_updateP19zappar_face_mesh_tiPKfS2_i =
                function () {
                  return t.asm.__Z23zappar_face_mesh_updateP19zappar_face_mesh_tiPKfS2_i.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z24zappar_face_mesh_indicesP19zappar_face_mesh_ti =
                function () {
                  return t.asm.__Z24zappar_face_mesh_indicesP19zappar_face_mesh_ti.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z24zappar_face_mesh_normalsP19zappar_face_mesh_ti =
                function () {
                  return t.asm.__Z24zappar_face_mesh_normalsP19zappar_face_mesh_ti.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z25zappar_face_mesh_uvs_sizeP19zappar_face_mesh_ti =
                function () {
                  return t.asm.__Z25zappar_face_mesh_uvs_sizeP19zappar_face_mesh_ti.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z25zappar_face_mesh_verticesP19zappar_face_mesh_ti =
                function () {
                  return t.asm.__Z25zappar_face_mesh_verticesP19zappar_face_mesh_ti.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z27zappar_face_landmark_updateP23zappar_face_landmark_tiPKfS2_i =
                function () {
                  return t.asm.__Z27zappar_face_landmark_updateP23zappar_face_landmark_tiPKfS2_i.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z29zappar_face_mesh_indices_sizeP19zappar_face_mesh_ti =
                function () {
                  return t.asm.__Z29zappar_face_mesh_indices_sizeP19zappar_face_mesh_ti.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z29zappar_face_mesh_normals_sizeP19zappar_face_mesh_ti =
                function () {
                  return t.asm.__Z29zappar_face_mesh_normals_sizeP19zappar_face_mesh_ti.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z30zappar_face_mesh_vertices_sizeP19zappar_face_mesh_ti =
                function () {
                  return t.asm.__Z30zappar_face_mesh_vertices_sizeP19zappar_face_mesh_ti.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z31zappar_face_mesh_loaded_versionP19zappar_face_mesh_ti =
                function () {
                  return t.asm.__Z31zappar_face_mesh_loaded_versionP19zappar_face_mesh_ti.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z33zappar_face_mesh_load_from_memoryP19zappar_face_mesh_tiPKciiiii =
                function () {
                  return t.asm.__Z33zappar_face_mesh_load_from_memoryP19zappar_face_mesh_tiPKciiiii.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z40zappar_image_tracker_target_preview_rgbaP23zappar_image_tracker_tii =
                function () {
                  return t.asm.__Z40zappar_image_tracker_target_preview_rgbaP23zappar_image_tracker_tii.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z42zappar_image_tracker_target_load_from_fileP23zappar_image_tracker_tiPKc =
                function () {
                  return t.asm.__Z42zappar_image_tracker_target_load_from_fileP23zappar_image_tracker_tiPKc.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z45zappar_image_tracker_target_preview_rgba_sizeP23zappar_image_tracker_tii =
                function () {
                  return t.asm.__Z45zappar_image_tracker_target_preview_rgba_sizeP23zappar_image_tracker_tii.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z46zappar_image_tracker_target_preview_compressedP23zappar_image_tracker_tii =
                function () {
                  return t.asm.__Z46zappar_image_tracker_target_preview_compressedP23zappar_image_tracker_tii.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z46zappar_image_tracker_target_preview_rgba_widthP23zappar_image_tracker_tii =
                function () {
                  return t.asm.__Z46zappar_image_tracker_target_preview_rgba_widthP23zappar_image_tracker_tii.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z47zappar_image_tracker_target_preview_rgba_heightP23zappar_image_tracker_tii =
                function () {
                  return t.asm.__Z47zappar_image_tracker_target_preview_rgba_heightP23zappar_image_tracker_tii.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z51zappar_image_tracker_target_preview_compressed_sizeP23zappar_image_tracker_tii =
                function () {
                  return t.asm.__Z51zappar_image_tracker_target_preview_compressed_sizeP23zappar_image_tracker_tii.apply(
                    null,
                    arguments
                  );
                }),
              (t.__Z55zappar_image_tracker_target_preview_compressed_mimetypeP23zappar_image_tracker_tii =
                function () {
                  return t.asm.__Z55zappar_image_tracker_target_preview_compressed_mimetypeP23zappar_image_tracker_tii.apply(
                    null,
                    arguments
                  );
                });
            var un = (t.__ZSt18uncaught_exceptionv = function () {
              return t.asm.__ZSt18uncaught_exceptionv.apply(null, arguments);
            });
            (t.___cxa_can_catch = function () {
              return t.asm.___cxa_can_catch.apply(null, arguments);
            }),
              (t.___cxa_is_pointer_type = function () {
                return t.asm.___cxa_is_pointer_type.apply(null, arguments);
              }),
              (t.___em_js__emidentity = function () {
                return t.asm.___em_js__emidentity.apply(null, arguments);
              });
            var _n = (t.___emscripten_environ_constructor = function () {
              return t.asm.___emscripten_environ_constructor.apply(
                null,
                arguments
              );
            });
            (t.___errno_location = function () {
              return t.asm.___errno_location.apply(null, arguments);
            }),
              (t.__get_environ = function () {
                return t.asm.__get_environ.apply(null, arguments);
              });
            var cn = (t._emscripten_replace_memory = function () {
                return t.asm._emscripten_replace_memory.apply(null, arguments);
              }),
              fn = (t._free = function () {
                return t.asm._free.apply(null, arguments);
              });
            (t._llvm_bswap_i32 = function () {
              return t.asm._llvm_bswap_i32.apply(null, arguments);
            }),
              (t._llvm_round_f32 = function () {
                return t.asm._llvm_round_f32.apply(null, arguments);
              }),
              (t._llvm_round_f64 = function () {
                return t.asm._llvm_round_f64.apply(null, arguments);
              });
            var ln = (t._malloc = function () {
              return t.asm._malloc.apply(null, arguments);
            });
            (t._memcpy = function () {
              return t.asm._memcpy.apply(null, arguments);
            }),
              (t._memmove = function () {
                return t.asm._memmove.apply(null, arguments);
              }),
              (t._memset = function () {
                return t.asm._memset.apply(null, arguments);
              }),
              (t._pthread_cond_broadcast = function () {
                return t.asm._pthread_cond_broadcast.apply(null, arguments);
              }),
              (t._pthread_mutex_lock = function () {
                return t.asm._pthread_mutex_lock.apply(null, arguments);
              }),
              (t._pthread_mutex_unlock = function () {
                return t.asm._pthread_mutex_unlock.apply(null, arguments);
              }),
              (t._round = function () {
                return t.asm._round.apply(null, arguments);
              }),
              (t._sbrk = function () {
                return t.asm._sbrk.apply(null, arguments);
              }),
              (t._zappar_analytics_project_id_set = function () {
                return t.asm._zappar_analytics_project_id_set.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_barcode_finder_create = function () {
                return t.asm._zappar_barcode_finder_create.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_barcode_finder_destroy = function () {
                return t.asm._zappar_barcode_finder_destroy.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_barcode_finder_enabled = function () {
                return t.asm._zappar_barcode_finder_enabled.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_barcode_finder_enabled_set = function () {
                return t.asm._zappar_barcode_finder_enabled_set.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_barcode_finder_formats = function () {
                return t.asm._zappar_barcode_finder_formats.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_barcode_finder_formats_set = function () {
                return t.asm._zappar_barcode_finder_formats_set.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_barcode_finder_found_format = function () {
                return t.asm._zappar_barcode_finder_found_format.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_barcode_finder_found_number = function () {
                return t.asm._zappar_barcode_finder_found_number.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_barcode_finder_found_text = function () {
                return t.asm._zappar_barcode_finder_found_text.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_camera_default_device_id = function () {
                return t.asm._zappar_camera_default_device_id.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_camera_source_create = function () {
                return t.asm._zappar_camera_source_create.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_camera_source_destroy = function () {
                return t.asm._zappar_camera_source_destroy.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_camera_source_pause = function () {
                return t.asm._zappar_camera_source_pause.apply(null, arguments);
              }),
              (t._zappar_camera_source_start = function () {
                return t.asm._zappar_camera_source_start.apply(null, arguments);
              }),
              (t._zappar_face_landmark_anchor_pose = function () {
                return t.asm._zappar_face_landmark_anchor_pose.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_landmark_create = function () {
                return t.asm._zappar_face_landmark_create.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_landmark_destroy = function () {
                return t.asm._zappar_face_landmark_destroy.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_mesh_create = function () {
                return t.asm._zappar_face_mesh_create.apply(null, arguments);
              }),
              (t._zappar_face_mesh_destroy = function () {
                return t.asm._zappar_face_mesh_destroy.apply(null, arguments);
              }),
              (t._zappar_face_tracker_anchor_count = function () {
                return t.asm._zappar_face_tracker_anchor_count.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_tracker_anchor_expression_coefficients =
                function () {
                  return t.asm._zappar_face_tracker_anchor_expression_coefficients.apply(
                    null,
                    arguments
                  );
                }),
              (t._zappar_face_tracker_anchor_id = function () {
                return t.asm._zappar_face_tracker_anchor_id.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_tracker_anchor_identity_coefficients =
                function () {
                  return t.asm._zappar_face_tracker_anchor_identity_coefficients.apply(
                    null,
                    arguments
                  );
                }),
              (t._zappar_face_tracker_anchor_pose_raw = function () {
                return t.asm._zappar_face_tracker_anchor_pose_raw.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_tracker_create = function () {
                return t.asm._zappar_face_tracker_create.apply(null, arguments);
              }),
              (t._zappar_face_tracker_destroy = function () {
                return t.asm._zappar_face_tracker_destroy.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_tracker_enabled = function () {
                return t.asm._zappar_face_tracker_enabled.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_tracker_enabled_set = function () {
                return t.asm._zappar_face_tracker_enabled_set.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_tracker_max_faces = function () {
                return t.asm._zappar_face_tracker_max_faces.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_tracker_max_faces_set = function () {
                return t.asm._zappar_face_tracker_max_faces_set.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_tracker_model_load_from_memory = function () {
                return t.asm._zappar_face_tracker_model_load_from_memory.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_face_tracker_model_loaded_version = function () {
                return t.asm._zappar_face_tracker_model_loaded_version.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_has_initialized = function () {
                return t.asm._zappar_has_initialized.apply(null, arguments);
              }),
              (t._zappar_image_tracker_anchor_count = function () {
                return t.asm._zappar_image_tracker_anchor_count.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_image_tracker_anchor_id = function () {
                return t.asm._zappar_image_tracker_anchor_id.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_image_tracker_anchor_pose_raw = function () {
                return t.asm._zappar_image_tracker_anchor_pose_raw.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_image_tracker_create = function () {
                return t.asm._zappar_image_tracker_create.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_image_tracker_destroy = function () {
                return t.asm._zappar_image_tracker_destroy.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_image_tracker_enabled = function () {
                return t.asm._zappar_image_tracker_enabled.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_image_tracker_enabled_set = function () {
                return t.asm._zappar_image_tracker_enabled_set.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_image_tracker_target_count = function () {
                return t.asm._zappar_image_tracker_target_count.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_image_tracker_target_load_from_memory = function () {
                return t.asm._zappar_image_tracker_target_load_from_memory.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_image_tracker_target_loaded_version = function () {
                return t.asm._zappar_image_tracker_target_loaded_version.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_instant_world_tracker_anchor_pose_raw = function () {
                return t.asm._zappar_instant_world_tracker_anchor_pose_raw.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_instant_world_tracker_anchor_pose_set_from_camera_offset =
                function () {
                  return t.asm._zappar_instant_world_tracker_anchor_pose_set_from_camera_offset.apply(
                    null,
                    arguments
                  );
                }),
              (t._zappar_instant_world_tracker_create = function () {
                return t.asm._zappar_instant_world_tracker_create.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_instant_world_tracker_destroy = function () {
                return t.asm._zappar_instant_world_tracker_destroy.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_instant_world_tracker_enabled = function () {
                return t.asm._zappar_instant_world_tracker_enabled.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_instant_world_tracker_enabled_set = function () {
                return t.asm._zappar_instant_world_tracker_enabled_set.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_invert = function () {
                return t.asm._zappar_invert.apply(null, arguments);
              }),
              (t._zappar_log_level = function () {
                return t.asm._zappar_log_level.apply(null, arguments);
              }),
              (t._zappar_log_level_set = function () {
                return t.asm._zappar_log_level_set.apply(null, arguments);
              }),
              (t._zappar_pipeline_camera_frame_camera_attitude = function () {
                return t.asm._zappar_pipeline_camera_frame_camera_attitude.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_frame_submit = function () {
                return t.asm._zappar_pipeline_camera_frame_submit.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_frame_texture_gl = function () {
                return t.asm._zappar_pipeline_camera_frame_texture_gl.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_frame_texture_matrix = function () {
                return t.asm._zappar_pipeline_camera_frame_texture_matrix.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_frame_upload_gl = function () {
                return t.asm._zappar_pipeline_camera_frame_upload_gl.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_frame_user_data = function () {
                return t.asm._zappar_pipeline_camera_frame_user_data.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_frame_user_facing = function () {
                return t.asm._zappar_pipeline_camera_frame_user_facing.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_model = function () {
                return t.asm._zappar_pipeline_camera_model.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_pose_default = function () {
                return t.asm._zappar_pipeline_camera_pose_default.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_pose_with_attitude = function () {
                return t.asm._zappar_pipeline_camera_pose_with_attitude.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_camera_pose_with_origin = function () {
                return t.asm._zappar_pipeline_camera_pose_with_origin.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_create = function () {
                return t.asm._zappar_pipeline_create.apply(null, arguments);
              }),
              (t._zappar_pipeline_destroy = function () {
                return t.asm._zappar_pipeline_destroy.apply(null, arguments);
              }),
              (t._zappar_pipeline_frame_number = function () {
                return t.asm._zappar_pipeline_frame_number.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_frame_update = function () {
                return t.asm._zappar_pipeline_frame_update.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_motion_accelerometer_submit = function () {
                return t.asm._zappar_pipeline_motion_accelerometer_submit.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_motion_attitude_submit = function () {
                return t.asm._zappar_pipeline_motion_attitude_submit.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_motion_rotation_rate_submit = function () {
                return t.asm._zappar_pipeline_motion_rotation_rate_submit.apply(
                  null,
                  arguments
                );
              }),
              (t._zappar_pipeline_process_gl = function () {
                return t.asm._zappar_pipeline_process_gl.apply(null, arguments);
              }),
              (t.establishStackSpace = function () {
                return t.asm.establishStackSpace.apply(null, arguments);
              }),
              (t.getTempRet0 = function () {
                return t.asm.getTempRet0.apply(null, arguments);
              }),
              (t.runPostSets = function () {
                return t.asm.runPostSets.apply(null, arguments);
              });
            var pn = (t.setTempRet0 = function () {
              return t.asm.setTempRet0.apply(null, arguments);
            });
            t.setThrew = function () {
              return t.asm.setThrew.apply(null, arguments);
            };
            var hn = (t.stackAlloc = function () {
                return t.asm.stackAlloc.apply(null, arguments);
              }),
              mn = (t.stackRestore = function () {
                return t.asm.stackRestore.apply(null, arguments);
              }),
              dn = (t.stackSave = function () {
                return t.asm.stackSave.apply(null, arguments);
              });
            function bn() {
              function e() {
                if (!t.calledRun && ((t.calledRun = !0), !m)) {
                  if (
                    (ee || ((ee = !0), Y(K)),
                    Y(J),
                    t.onRuntimeInitialized && t.onRuntimeInitialized(),
                    t.postRun)
                  )
                    for (
                      "function" == typeof t.postRun &&
                      (t.postRun = [t.postRun]);
                      t.postRun.length;

                    ) {
                      var e = t.postRun.shift();
                      $.unshift(e);
                    }
                  Y($);
                }
              }
              if (!(0 < oe)) {
                if (t.preRun)
                  for (
                    "function" == typeof t.preRun && (t.preRun = [t.preRun]);
                    t.preRun.length;

                  )
                    te();
                Y(X),
                  0 < oe ||
                    t.calledRun ||
                    (t.setStatus
                      ? (t.setStatus("Running..."),
                        setTimeout(function () {
                          setTimeout(function () {
                            t.setStatus("");
                          }, 1),
                            e();
                        }, 1))
                      : e());
              }
            }
            function yn(e) {
              throw (
                (t.onAbort && t.onAbort(e),
                void 0 !== e ? (s(e), u(e), (e = JSON.stringify(e))) : (e = ""),
                (m = !0),
                "abort(" + e + "). Build with -s ASSERTIONS=1 for more info.")
              );
            }
            if (
              ((t.dynCall_i = function () {
                return t.asm.dynCall_i.apply(null, arguments);
              }),
              (t.dynCall_ii = function () {
                return t.asm.dynCall_ii.apply(null, arguments);
              }),
              (t.dynCall_iii = function () {
                return t.asm.dynCall_iii.apply(null, arguments);
              }),
              (t.dynCall_iiii = function () {
                return t.asm.dynCall_iiii.apply(null, arguments);
              }),
              (t.dynCall_iiiii = function () {
                return t.asm.dynCall_iiiii.apply(null, arguments);
              }),
              (t.dynCall_iiiiid = function () {
                return t.asm.dynCall_iiiiid.apply(null, arguments);
              }),
              (t.dynCall_iiiiii = function () {
                return t.asm.dynCall_iiiiii.apply(null, arguments);
              }),
              (t.dynCall_iiiiiid = function () {
                return t.asm.dynCall_iiiiiid.apply(null, arguments);
              }),
              (t.dynCall_iiiiiii = function () {
                return t.asm.dynCall_iiiiiii.apply(null, arguments);
              }),
              (t.dynCall_iiiiiiii = function () {
                return t.asm.dynCall_iiiiiiii.apply(null, arguments);
              }),
              (t.dynCall_iiiiiiiii = function () {
                return t.asm.dynCall_iiiiiiiii.apply(null, arguments);
              }),
              (t.dynCall_iiiiij = function () {
                return t.asm.dynCall_iiiiij.apply(null, arguments);
              }),
              (t.dynCall_iiji = function () {
                return t.asm.dynCall_iiji.apply(null, arguments);
              }),
              (t.dynCall_v = function () {
                return t.asm.dynCall_v.apply(null, arguments);
              }),
              (t.dynCall_vi = function () {
                return t.asm.dynCall_vi.apply(null, arguments);
              }),
              (t.dynCall_vii = function () {
                return t.asm.dynCall_vii.apply(null, arguments);
              }),
              (t.dynCall_viiffii = function () {
                return t.asm.dynCall_viiffii.apply(null, arguments);
              }),
              (t.dynCall_viii = function () {
                return t.asm.dynCall_viii.apply(null, arguments);
              }),
              (t.dynCall_viiifffii = function () {
                return t.asm.dynCall_viiifffii.apply(null, arguments);
              }),
              (t.dynCall_viiiffii = function () {
                return t.asm.dynCall_viiiffii.apply(null, arguments);
              }),
              (t.dynCall_viiii = function () {
                return t.asm.dynCall_viiii.apply(null, arguments);
              }),
              (t.dynCall_viiiii = function () {
                return t.asm.dynCall_viiiii.apply(null, arguments);
              }),
              (t.dynCall_viiiiiffffffffffffffff = function () {
                return t.asm.dynCall_viiiiiffffffffffffffff.apply(
                  null,
                  arguments
                );
              }),
              (t.dynCall_viiiiii = function () {
                return t.asm.dynCall_viiiiii.apply(null, arguments);
              }),
              (t.dynCall_viijii = function () {
                return t.asm.dynCall_viijii.apply(null, arguments);
              }),
              (t.dynCall_vij = function () {
                return t.asm.dynCall_vij.apply(null, arguments);
              }),
              (t.dynCall_viji = function () {
                return t.asm.dynCall_viji.apply(null, arguments);
              }),
              (t.dynCall_vijii = function () {
                return t.asm.dynCall_vijii.apply(null, arguments);
              }),
              (t.asm = Vr),
              (t.cwrap = function (e, t, r, n) {
                var a = (r = r || []).every(function (e) {
                  return "number" === e;
                });
                return "string" !== t && a && !n
                  ? b(e)
                  : function () {
                      var n = r,
                        a = arguments,
                        i = b(e),
                        o = [],
                        s = 0;
                      if (a)
                        for (var u = 0; u < a.length; u++) {
                          var _ = v[n[u]];
                          _
                            ? (0 === s && (s = dn()), (o[u] = _(a[u])))
                            : (o[u] = a[u]);
                        }
                      return (
                        (n = i.apply(null, o)),
                        (n = "string" === t ? g(n) : "boolean" === t ? !!n : n),
                        0 !== s && mn(s),
                        n
                      );
                    };
              }),
              (t.setValue = function (e, t, r) {
                switch (
                  ("*" === (r = r || "i8").charAt(r.length - 1) && (r = "i32"),
                  r)
                ) {
                  case "i1":
                  case "i8":
                    L[e >> 0] = t;
                    break;
                  case "i16":
                    C[e >> 1] = t;
                    break;
                  case "i32":
                    S[e >> 2] = t;
                    break;
                  case "i64":
                    (tempI64 = [
                      t >>> 0,
                      ((tempDouble = t),
                      1 <= +re(tempDouble)
                        ? 0 < tempDouble
                          ? (0 |
                              ie(+ae(tempDouble / 4294967296), 4294967295)) >>>
                            0
                          : ~~+ne(
                              (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                            ) >>> 0
                        : 0),
                    ]),
                      (S[e >> 2] = tempI64[0]),
                      (S[(e + 4) >> 2] = tempI64[1]);
                    break;
                  case "float":
                    P[e >> 2] = t;
                    break;
                  case "double":
                    I[e >> 3] = t;
                    break;
                  default:
                    yn("invalid type for setValue: " + r);
                }
              }),
              (t.getValue = function (e, t) {
                switch (
                  ("*" === (t = t || "i8").charAt(t.length - 1) && (t = "i32"),
                  t)
                ) {
                  case "i1":
                  case "i8":
                    return L[e >> 0];
                  case "i16":
                    return C[e >> 1];
                  case "i32":
                  case "i64":
                    return S[e >> 2];
                  case "float":
                    return P[e >> 2];
                  case "double":
                    return I[e >> 3];
                  default:
                    yn("invalid type for getValue: " + t);
                }
                return null;
              }),
              (t.UTF8ToString = k),
              (t.then = function (e) {
                if (t.calledRun) e(t);
                else {
                  var r = t.onRuntimeInitialized;
                  t.onRuntimeInitialized = function () {
                    r && r(), e(t);
                  };
                }
                return t;
              }),
              (ue = function e() {
                t.calledRun || bn(), t.calledRun || (ue = e);
              }),
              (t.run = bn),
              (t.abort = yn),
              t.preInit)
            )
              for (
                "function" == typeof t.preInit && (t.preInit = [t.preInit]);
                0 < t.preInit.length;

              )
                t.preInit.pop()();
            return (t.noExitRuntime = !0), bn(), e;
          });
      },
      740: (e, t, r) => {
        r.r(t), r.d(t, { default: () => n });
        const n = r.p + "79a9ee7cc93d3f6956fc17a4ad1de0d5.wasm";
      },
      887: (e, t, r) => {
        r.r(t),
          r.d(t, {
            glMatrix: () => n,
            mat2: () => a,
            mat2d: () => i,
            mat3: () => o,
            mat4: () => s,
            quat: () => c,
            quat2: () => f,
            vec2: () => l,
            vec3: () => u,
            vec4: () => _,
          });
        var n = {};
        r.r(n),
          r.d(n, {
            ARRAY_TYPE: () => h,
            EPSILON: () => p,
            RANDOM: () => m,
            equals: () => v,
            setMatrixArrayType: () => d,
            toRadian: () => y,
          });
        var a = {};
        r.r(a),
          r.d(a, {
            LDU: () => D,
            add: () => j,
            adjoint: () => E,
            clone: () => w,
            copy: () => M,
            create: () => g,
            determinant: () => C,
            equals: () => q,
            exactEquals: () => V,
            frob: () => F,
            fromRotation: () => P,
            fromScaling: () => I,
            fromValues: () => z,
            identity: () => k,
            invert: () => L,
            mul: () => U,
            multiply: () => O,
            multiplyScalar: () => G,
            multiplyScalarAndAdd: () => N,
            rotate: () => S,
            scale: () => T,
            set: () => A,
            str: () => B,
            sub: () => W,
            subtract: () => R,
            transpose: () => x,
          });
        var i = {};
        r.r(i),
          r.d(i, {
            add: () => _e,
            clone: () => Z,
            copy: () => Y,
            create: () => H,
            determinant: () => $,
            equals: () => he,
            exactEquals: () => pe,
            frob: () => ue,
            fromRotation: () => ae,
            fromScaling: () => ie,
            fromTranslation: () => oe,
            fromValues: () => K,
            identity: () => X,
            invert: () => Q,
            mul: () => me,
            multiply: () => ee,
            multiplyScalar: () => fe,
            multiplyScalarAndAdd: () => le,
            rotate: () => te,
            scale: () => re,
            set: () => J,
            str: () => se,
            sub: () => de,
            subtract: () => ce,
            translate: () => ne,
          });
        var o = {};
        r.r(o),
          r.d(o, {
            add: () => qe,
            adjoint: () => xe,
            clone: () => ve,
            copy: () => ge,
            create: () => be,
            determinant: () => Le,
            equals: () => He,
            exactEquals: () => We,
            frob: () => Ve,
            fromMat2d: () => Be,
            fromMat4: () => ye,
            fromQuat: () => Fe,
            fromRotation: () => Pe,
            fromScaling: () => Ie,
            fromTranslation: () => Te,
            fromValues: () => we,
            identity: () => ke,
            invert: () => Ae,
            mul: () => Ze,
            multiply: () => Ee,
            multiplyScalar: () => Ne,
            multiplyScalarAndAdd: () => Ue,
            normalFromMat4: () => De,
            projection: () => je,
            rotate: () => Oe,
            scale: () => Se,
            set: () => Me,
            str: () => Re,
            sub: () => Ye,
            subtract: () => Ge,
            translate: () => Ce,
            transpose: () => ze,
          });
        var s = {};
        r.r(s),
          r.d(s, {
            add: () => It,
            adjoint: () => nt,
            clone: () => Ke,
            copy: () => Je,
            create: () => Xe,
            determinant: () => at,
            equals: () => Rt,
            exactEquals: () => jt,
            frob: () => Pt,
            fromQuat: () => At,
            fromQuat2: () => vt,
            fromRotation: () => ht,
            fromRotationTranslation: () => yt,
            fromRotationTranslationScale: () => kt,
            fromRotationTranslationScaleOrigin: () => zt,
            fromScaling: () => pt,
            fromTranslation: () => lt,
            fromValues: () => Qe,
            fromXRotation: () => mt,
            fromYRotation: () => dt,
            fromZRotation: () => bt,
            frustum: () => xt,
            getRotation: () => Mt,
            getScaling: () => wt,
            getTranslation: () => gt,
            identity: () => et,
            invert: () => rt,
            lookAt: () => Ot,
            mul: () => Vt,
            multiply: () => it,
            multiplyScalar: () => Ft,
            multiplyScalarAndAdd: () => Dt,
            ortho: () => Ct,
            perspective: () => Lt,
            perspectiveFromFieldOfView: () => Et,
            rotate: () => ut,
            rotateX: () => _t,
            rotateY: () => ct,
            rotateZ: () => ft,
            scale: () => st,
            set: () => $e,
            str: () => Tt,
            sub: () => qt,
            subtract: () => Bt,
            targetTo: () => St,
            translate: () => ot,
            transpose: () => tt,
          });
        var u = {};
        r.r(u),
          r.d(u, {
            add: () => Yt,
            angle: () => kr,
            bezier: () => mr,
            ceil: () => Qt,
            clone: () => Nt,
            copy: () => Ht,
            create: () => Gt,
            cross: () => lr,
            dist: () => Tr,
            distance: () => ir,
            div: () => Sr,
            divide: () => Jt,
            dot: () => fr,
            equals: () => Lr,
            exactEquals: () => xr,
            floor: () => $t,
            forEach: () => Fr,
            fromValues: () => Wt,
            hermite: () => hr,
            inverse: () => _r,
            len: () => Ir,
            length: () => Ut,
            lerp: () => pr,
            max: () => tr,
            min: () => er,
            mul: () => Or,
            multiply: () => Kt,
            negate: () => ur,
            normalize: () => cr,
            random: () => dr,
            rotateX: () => gr,
            rotateY: () => wr,
            rotateZ: () => Mr,
            round: () => rr,
            scale: () => nr,
            scaleAndAdd: () => ar,
            set: () => Zt,
            sqrDist: () => Pr,
            sqrLen: () => Br,
            squaredDistance: () => or,
            squaredLength: () => sr,
            str: () => Ar,
            sub: () => Cr,
            subtract: () => Xt,
            transformMat3: () => yr,
            transformMat4: () => br,
            transformQuat: () => vr,
            zero: () => zr,
          });
        var _ = {};
        r.r(_),
          r.d(_, {
            add: () => Gr,
            ceil: () => Hr,
            clone: () => jr,
            copy: () => Vr,
            create: () => Dr,
            cross: () => un,
            dist: () => gn,
            distance: () => $r,
            div: () => vn,
            divide: () => Wr,
            dot: () => sn,
            equals: () => dn,
            exactEquals: () => mn,
            floor: () => Zr,
            forEach: () => zn,
            fromValues: () => Rr,
            inverse: () => an,
            len: () => Mn,
            length: () => tn,
            lerp: () => _n,
            max: () => Xr,
            min: () => Yr,
            mul: () => yn,
            multiply: () => Ur,
            negate: () => nn,
            normalize: () => on,
            random: () => cn,
            round: () => Kr,
            scale: () => Jr,
            scaleAndAdd: () => Qr,
            set: () => qr,
            sqrDist: () => wn,
            sqrLen: () => kn,
            squaredDistance: () => en,
            squaredLength: () => rn,
            str: () => hn,
            sub: () => bn,
            subtract: () => Nr,
            transformMat4: () => fn,
            transformQuat: () => ln,
            zero: () => pn,
          });
        var c = {};
        r.r(c),
          r.d(c, {
            add: () => ta,
            calculateW: () => In,
            clone: () => Jn,
            conjugate: () => qn,
            copy: () => $n,
            create: () => An,
            dot: () => aa,
            equals: () => la,
            exactEquals: () => fa,
            exp: () => Bn,
            fromEuler: () => Nn,
            fromMat3: () => Gn,
            fromValues: () => Qn,
            getAngle: () => Cn,
            getAxisAngle: () => En,
            identity: () => xn,
            invert: () => Vn,
            len: () => sa,
            length: () => oa,
            lerp: () => ia,
            ln: () => Fn,
            mul: () => ra,
            multiply: () => On,
            normalize: () => ca,
            pow: () => Dn,
            random: () => Rn,
            rotateX: () => Sn,
            rotateY: () => Tn,
            rotateZ: () => Pn,
            rotationTo: () => pa,
            scale: () => na,
            set: () => ea,
            setAxes: () => ma,
            setAxisAngle: () => Ln,
            slerp: () => jn,
            sqlerp: () => ha,
            sqrLen: () => _a,
            squaredLength: () => ua,
            str: () => Un,
          });
        var f = {};
        r.r(f),
          r.d(f, {
            add: () => Ra,
            clone: () => ba,
            conjugate: () => Ha,
            copy: () => za,
            create: () => da,
            dot: () => Na,
            equals: () => ei,
            exactEquals: () => $a,
            fromMat4: () => ka,
            fromRotation: () => Ma,
            fromRotationTranslation: () => ga,
            fromRotationTranslationValues: () => va,
            fromTranslation: () => wa,
            fromValues: () => ya,
            getDual: () => Ea,
            getReal: () => La,
            getTranslation: () => Sa,
            identity: () => Aa,
            invert: () => Wa,
            len: () => Ya,
            length: () => Za,
            lerp: () => Ua,
            mul: () => qa,
            multiply: () => Va,
            normalize: () => Ja,
            rotateAroundAxis: () => ja,
            rotateByQuatAppend: () => Fa,
            rotateByQuatPrepend: () => Da,
            rotateX: () => Pa,
            rotateY: () => Ia,
            rotateZ: () => Ba,
            scale: () => Ga,
            set: () => xa,
            setDual: () => Oa,
            setReal: () => Ca,
            sqrLen: () => Ka,
            squaredLength: () => Xa,
            str: () => Qa,
            translate: () => Ta,
          });
        var l = {};
        r.r(l),
          r.d(l, {
            add: () => oi,
            angle: () => Pi,
            ceil: () => ci,
            clone: () => ri,
            copy: () => ai,
            create: () => ti,
            cross: () => Ai,
            dist: () => Gi,
            distance: () => bi,
            div: () => qi,
            divide: () => _i,
            dot: () => zi,
            equals: () => Di,
            exactEquals: () => Fi,
            floor: () => fi,
            forEach: () => Wi,
            fromValues: () => ni,
            inverse: () => Mi,
            len: () => ji,
            length: () => vi,
            lerp: () => xi,
            max: () => pi,
            min: () => li,
            mul: () => Vi,
            multiply: () => ui,
            negate: () => wi,
            normalize: () => ki,
            random: () => Li,
            rotate: () => Ti,
            round: () => hi,
            scale: () => mi,
            scaleAndAdd: () => di,
            set: () => ii,
            sqrDist: () => Ni,
            sqrLen: () => Ui,
            squaredDistance: () => yi,
            squaredLength: () => gi,
            str: () => Bi,
            sub: () => Ri,
            subtract: () => si,
            transformMat2: () => Ei,
            transformMat2d: () => Ci,
            transformMat3: () => Oi,
            transformMat4: () => Si,
            zero: () => Ii,
          });
        var p = 1e-6,
          h = "undefined" != typeof Float32Array ? Float32Array : Array,
          m = Math.random;
        function d(e) {
          h = e;
        }
        var b = Math.PI / 180;
        function y(e) {
          return e * b;
        }
        function v(e, t) {
          return Math.abs(e - t) <= p * Math.max(1, Math.abs(e), Math.abs(t));
        }
        function g() {
          var e = new h(4);
          return (
            h != Float32Array && ((e[1] = 0), (e[2] = 0)),
            (e[0] = 1),
            (e[3] = 1),
            e
          );
        }
        function w(e) {
          var t = new h(4);
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
        }
        function M(e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
        }
        function k(e) {
          return (e[0] = 1), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
        }
        function z(e, t, r, n) {
          var a = new h(4);
          return (a[0] = e), (a[1] = t), (a[2] = r), (a[3] = n), a;
        }
        function A(e, t, r, n, a) {
          return (e[0] = t), (e[1] = r), (e[2] = n), (e[3] = a), e;
        }
        function x(e, t) {
          if (e === t) {
            var r = t[1];
            (e[1] = t[2]), (e[2] = r);
          } else (e[0] = t[0]), (e[1] = t[2]), (e[2] = t[1]), (e[3] = t[3]);
          return e;
        }
        function L(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = r * i - a * n;
          return o
            ? ((o = 1 / o),
              (e[0] = i * o),
              (e[1] = -n * o),
              (e[2] = -a * o),
              (e[3] = r * o),
              e)
            : null;
        }
        function E(e, t) {
          var r = t[0];
          return (e[0] = t[3]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = r), e;
        }
        function C(e) {
          return e[0] * e[3] - e[2] * e[1];
        }
        function O(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = r[0],
            u = r[1],
            _ = r[2],
            c = r[3];
          return (
            (e[0] = n * s + i * u),
            (e[1] = a * s + o * u),
            (e[2] = n * _ + i * c),
            (e[3] = a * _ + o * c),
            e
          );
        }
        function S(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = Math.sin(r),
            u = Math.cos(r);
          return (
            (e[0] = n * u + i * s),
            (e[1] = a * u + o * s),
            (e[2] = n * -s + i * u),
            (e[3] = a * -s + o * u),
            e
          );
        }
        function T(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = r[0],
            u = r[1];
          return (
            (e[0] = n * s), (e[1] = a * s), (e[2] = i * u), (e[3] = o * u), e
          );
        }
        function P(e, t) {
          var r = Math.sin(t),
            n = Math.cos(t);
          return (e[0] = n), (e[1] = r), (e[2] = -r), (e[3] = n), e;
        }
        function I(e, t) {
          return (e[0] = t[0]), (e[1] = 0), (e[2] = 0), (e[3] = t[1]), e;
        }
        function B(e) {
          return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
        }
        function F(e) {
          return Math.hypot(e[0], e[1], e[2], e[3]);
        }
        function D(e, t, r, n) {
          return (
            (e[2] = n[2] / n[0]),
            (r[0] = n[0]),
            (r[1] = n[1]),
            (r[3] = n[3] - e[2] * r[1]),
            [e, t, r]
          );
        }
        function j(e, t, r) {
          return (
            (e[0] = t[0] + r[0]),
            (e[1] = t[1] + r[1]),
            (e[2] = t[2] + r[2]),
            (e[3] = t[3] + r[3]),
            e
          );
        }
        function R(e, t, r) {
          return (
            (e[0] = t[0] - r[0]),
            (e[1] = t[1] - r[1]),
            (e[2] = t[2] - r[2]),
            (e[3] = t[3] - r[3]),
            e
          );
        }
        function V(e, t) {
          return (
            e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
          );
        }
        function q(e, t) {
          var r = e[0],
            n = e[1],
            a = e[2],
            i = e[3],
            o = t[0],
            s = t[1],
            u = t[2],
            _ = t[3];
          return (
            Math.abs(r - o) <= p * Math.max(1, Math.abs(r), Math.abs(o)) &&
            Math.abs(n - s) <= p * Math.max(1, Math.abs(n), Math.abs(s)) &&
            Math.abs(a - u) <= p * Math.max(1, Math.abs(a), Math.abs(u)) &&
            Math.abs(i - _) <= p * Math.max(1, Math.abs(i), Math.abs(_))
          );
        }
        function G(e, t, r) {
          return (
            (e[0] = t[0] * r),
            (e[1] = t[1] * r),
            (e[2] = t[2] * r),
            (e[3] = t[3] * r),
            e
          );
        }
        function N(e, t, r, n) {
          return (
            (e[0] = t[0] + r[0] * n),
            (e[1] = t[1] + r[1] * n),
            (e[2] = t[2] + r[2] * n),
            (e[3] = t[3] + r[3] * n),
            e
          );
        }
        Math.hypot ||
          (Math.hypot = function () {
            for (var e = 0, t = arguments.length; t--; )
              e += arguments[t] * arguments[t];
            return Math.sqrt(e);
          });
        var U = O,
          W = R;
        function H() {
          var e = new h(6);
          return (
            h != Float32Array &&
              ((e[1] = 0), (e[2] = 0), (e[4] = 0), (e[5] = 0)),
            (e[0] = 1),
            (e[3] = 1),
            e
          );
        }
        function Z(e) {
          var t = new h(6);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            t
          );
        }
        function Y(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            e
          );
        }
        function X(e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 1),
            (e[4] = 0),
            (e[5] = 0),
            e
          );
        }
        function K(e, t, r, n, a, i) {
          var o = new h(6);
          return (
            (o[0] = e),
            (o[1] = t),
            (o[2] = r),
            (o[3] = n),
            (o[4] = a),
            (o[5] = i),
            o
          );
        }
        function J(e, t, r, n, a, i, o) {
          return (
            (e[0] = t),
            (e[1] = r),
            (e[2] = n),
            (e[3] = a),
            (e[4] = i),
            (e[5] = o),
            e
          );
        }
        function Q(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = t[4],
            s = t[5],
            u = r * i - n * a;
          return u
            ? ((u = 1 / u),
              (e[0] = i * u),
              (e[1] = -n * u),
              (e[2] = -a * u),
              (e[3] = r * u),
              (e[4] = (a * s - i * o) * u),
              (e[5] = (n * o - r * s) * u),
              e)
            : null;
        }
        function $(e) {
          return e[0] * e[3] - e[1] * e[2];
        }
        function ee(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = r[0],
            c = r[1],
            f = r[2],
            l = r[3],
            p = r[4],
            h = r[5];
          return (
            (e[0] = n * _ + i * c),
            (e[1] = a * _ + o * c),
            (e[2] = n * f + i * l),
            (e[3] = a * f + o * l),
            (e[4] = n * p + i * h + s),
            (e[5] = a * p + o * h + u),
            e
          );
        }
        function te(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = Math.sin(r),
            c = Math.cos(r);
          return (
            (e[0] = n * c + i * _),
            (e[1] = a * c + o * _),
            (e[2] = n * -_ + i * c),
            (e[3] = a * -_ + o * c),
            (e[4] = s),
            (e[5] = u),
            e
          );
        }
        function re(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = r[0],
            c = r[1];
          return (
            (e[0] = n * _),
            (e[1] = a * _),
            (e[2] = i * c),
            (e[3] = o * c),
            (e[4] = s),
            (e[5] = u),
            e
          );
        }
        function ne(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = r[0],
            c = r[1];
          return (
            (e[0] = n),
            (e[1] = a),
            (e[2] = i),
            (e[3] = o),
            (e[4] = n * _ + i * c + s),
            (e[5] = a * _ + o * c + u),
            e
          );
        }
        function ae(e, t) {
          var r = Math.sin(t),
            n = Math.cos(t);
          return (
            (e[0] = n),
            (e[1] = r),
            (e[2] = -r),
            (e[3] = n),
            (e[4] = 0),
            (e[5] = 0),
            e
          );
        }
        function ie(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = t[1]),
            (e[4] = 0),
            (e[5] = 0),
            e
          );
        }
        function oe(e, t) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 1),
            (e[4] = t[0]),
            (e[5] = t[1]),
            e
          );
        }
        function se(e) {
          return (
            "mat2d(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ")"
          );
        }
        function ue(e) {
          return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], 1);
        }
        function _e(e, t, r) {
          return (
            (e[0] = t[0] + r[0]),
            (e[1] = t[1] + r[1]),
            (e[2] = t[2] + r[2]),
            (e[3] = t[3] + r[3]),
            (e[4] = t[4] + r[4]),
            (e[5] = t[5] + r[5]),
            e
          );
        }
        function ce(e, t, r) {
          return (
            (e[0] = t[0] - r[0]),
            (e[1] = t[1] - r[1]),
            (e[2] = t[2] - r[2]),
            (e[3] = t[3] - r[3]),
            (e[4] = t[4] - r[4]),
            (e[5] = t[5] - r[5]),
            e
          );
        }
        function fe(e, t, r) {
          return (
            (e[0] = t[0] * r),
            (e[1] = t[1] * r),
            (e[2] = t[2] * r),
            (e[3] = t[3] * r),
            (e[4] = t[4] * r),
            (e[5] = t[5] * r),
            e
          );
        }
        function le(e, t, r, n) {
          return (
            (e[0] = t[0] + r[0] * n),
            (e[1] = t[1] + r[1] * n),
            (e[2] = t[2] + r[2] * n),
            (e[3] = t[3] + r[3] * n),
            (e[4] = t[4] + r[4] * n),
            (e[5] = t[5] + r[5] * n),
            e
          );
        }
        function pe(e, t) {
          return (
            e[0] === t[0] &&
            e[1] === t[1] &&
            e[2] === t[2] &&
            e[3] === t[3] &&
            e[4] === t[4] &&
            e[5] === t[5]
          );
        }
        function he(e, t) {
          var r = e[0],
            n = e[1],
            a = e[2],
            i = e[3],
            o = e[4],
            s = e[5],
            u = t[0],
            _ = t[1],
            c = t[2],
            f = t[3],
            l = t[4],
            h = t[5];
          return (
            Math.abs(r - u) <= p * Math.max(1, Math.abs(r), Math.abs(u)) &&
            Math.abs(n - _) <= p * Math.max(1, Math.abs(n), Math.abs(_)) &&
            Math.abs(a - c) <= p * Math.max(1, Math.abs(a), Math.abs(c)) &&
            Math.abs(i - f) <= p * Math.max(1, Math.abs(i), Math.abs(f)) &&
            Math.abs(o - l) <= p * Math.max(1, Math.abs(o), Math.abs(l)) &&
            Math.abs(s - h) <= p * Math.max(1, Math.abs(s), Math.abs(h))
          );
        }
        var me = ee,
          de = ce;
        function be() {
          var e = new h(9);
          return (
            h != Float32Array &&
              ((e[1] = 0),
              (e[2] = 0),
              (e[3] = 0),
              (e[5] = 0),
              (e[6] = 0),
              (e[7] = 0)),
            (e[0] = 1),
            (e[4] = 1),
            (e[8] = 1),
            e
          );
        }
        function ye(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[4]),
            (e[4] = t[5]),
            (e[5] = t[6]),
            (e[6] = t[8]),
            (e[7] = t[9]),
            (e[8] = t[10]),
            e
          );
        }
        function ve(e) {
          var t = new h(9);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[8] = e[8]),
            t
          );
        }
        function ge(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            e
          );
        }
        function we(e, t, r, n, a, i, o, s, u) {
          var _ = new h(9);
          return (
            (_[0] = e),
            (_[1] = t),
            (_[2] = r),
            (_[3] = n),
            (_[4] = a),
            (_[5] = i),
            (_[6] = o),
            (_[7] = s),
            (_[8] = u),
            _
          );
        }
        function Me(e, t, r, n, a, i, o, s, u, _) {
          return (
            (e[0] = t),
            (e[1] = r),
            (e[2] = n),
            (e[3] = a),
            (e[4] = i),
            (e[5] = o),
            (e[6] = s),
            (e[7] = u),
            (e[8] = _),
            e
          );
        }
        function ke(e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 1),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 1),
            e
          );
        }
        function ze(e, t) {
          if (e === t) {
            var r = t[1],
              n = t[2],
              a = t[5];
            (e[1] = t[3]),
              (e[2] = t[6]),
              (e[3] = r),
              (e[5] = t[7]),
              (e[6] = n),
              (e[7] = a);
          } else
            (e[0] = t[0]),
              (e[1] = t[3]),
              (e[2] = t[6]),
              (e[3] = t[1]),
              (e[4] = t[4]),
              (e[5] = t[7]),
              (e[6] = t[2]),
              (e[7] = t[5]),
              (e[8] = t[8]);
          return e;
        }
        function Ae(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = t[4],
            s = t[5],
            u = t[6],
            _ = t[7],
            c = t[8],
            f = c * o - s * _,
            l = -c * i + s * u,
            p = _ * i - o * u,
            h = r * f + n * l + a * p;
          return h
            ? ((h = 1 / h),
              (e[0] = f * h),
              (e[1] = (-c * n + a * _) * h),
              (e[2] = (s * n - a * o) * h),
              (e[3] = l * h),
              (e[4] = (c * r - a * u) * h),
              (e[5] = (-s * r + a * i) * h),
              (e[6] = p * h),
              (e[7] = (-_ * r + n * u) * h),
              (e[8] = (o * r - n * i) * h),
              e)
            : null;
        }
        function xe(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = t[4],
            s = t[5],
            u = t[6],
            _ = t[7],
            c = t[8];
          return (
            (e[0] = o * c - s * _),
            (e[1] = a * _ - n * c),
            (e[2] = n * s - a * o),
            (e[3] = s * u - i * c),
            (e[4] = r * c - a * u),
            (e[5] = a * i - r * s),
            (e[6] = i * _ - o * u),
            (e[7] = n * u - r * _),
            (e[8] = r * o - n * i),
            e
          );
        }
        function Le(e) {
          var t = e[0],
            r = e[1],
            n = e[2],
            a = e[3],
            i = e[4],
            o = e[5],
            s = e[6],
            u = e[7],
            _ = e[8];
          return (
            t * (_ * i - o * u) + r * (-_ * a + o * s) + n * (u * a - i * s)
          );
        }
        function Ee(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = t[6],
            c = t[7],
            f = t[8],
            l = r[0],
            p = r[1],
            h = r[2],
            m = r[3],
            d = r[4],
            b = r[5],
            y = r[6],
            v = r[7],
            g = r[8];
          return (
            (e[0] = l * n + p * o + h * _),
            (e[1] = l * a + p * s + h * c),
            (e[2] = l * i + p * u + h * f),
            (e[3] = m * n + d * o + b * _),
            (e[4] = m * a + d * s + b * c),
            (e[5] = m * i + d * u + b * f),
            (e[6] = y * n + v * o + g * _),
            (e[7] = y * a + v * s + g * c),
            (e[8] = y * i + v * u + g * f),
            e
          );
        }
        function Ce(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = t[6],
            c = t[7],
            f = t[8],
            l = r[0],
            p = r[1];
          return (
            (e[0] = n),
            (e[1] = a),
            (e[2] = i),
            (e[3] = o),
            (e[4] = s),
            (e[5] = u),
            (e[6] = l * n + p * o + _),
            (e[7] = l * a + p * s + c),
            (e[8] = l * i + p * u + f),
            e
          );
        }
        function Oe(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = t[6],
            c = t[7],
            f = t[8],
            l = Math.sin(r),
            p = Math.cos(r);
          return (
            (e[0] = p * n + l * o),
            (e[1] = p * a + l * s),
            (e[2] = p * i + l * u),
            (e[3] = p * o - l * n),
            (e[4] = p * s - l * a),
            (e[5] = p * u - l * i),
            (e[6] = _),
            (e[7] = c),
            (e[8] = f),
            e
          );
        }
        function Se(e, t, r) {
          var n = r[0],
            a = r[1];
          return (
            (e[0] = n * t[0]),
            (e[1] = n * t[1]),
            (e[2] = n * t[2]),
            (e[3] = a * t[3]),
            (e[4] = a * t[4]),
            (e[5] = a * t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            e
          );
        }
        function Te(e, t) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 1),
            (e[5] = 0),
            (e[6] = t[0]),
            (e[7] = t[1]),
            (e[8] = 1),
            e
          );
        }
        function Pe(e, t) {
          var r = Math.sin(t),
            n = Math.cos(t);
          return (
            (e[0] = n),
            (e[1] = r),
            (e[2] = 0),
            (e[3] = -r),
            (e[4] = n),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 1),
            e
          );
        }
        function Ie(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = t[1]),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 1),
            e
          );
        }
        function Be(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = 0),
            (e[3] = t[2]),
            (e[4] = t[3]),
            (e[5] = 0),
            (e[6] = t[4]),
            (e[7] = t[5]),
            (e[8] = 1),
            e
          );
        }
        function Fe(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = r + r,
            s = n + n,
            u = a + a,
            _ = r * o,
            c = n * o,
            f = n * s,
            l = a * o,
            p = a * s,
            h = a * u,
            m = i * o,
            d = i * s,
            b = i * u;
          return (
            (e[0] = 1 - f - h),
            (e[3] = c - b),
            (e[6] = l + d),
            (e[1] = c + b),
            (e[4] = 1 - _ - h),
            (e[7] = p - m),
            (e[2] = l - d),
            (e[5] = p + m),
            (e[8] = 1 - _ - f),
            e
          );
        }
        function De(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = t[4],
            s = t[5],
            u = t[6],
            _ = t[7],
            c = t[8],
            f = t[9],
            l = t[10],
            p = t[11],
            h = t[12],
            m = t[13],
            d = t[14],
            b = t[15],
            y = r * s - n * o,
            v = r * u - a * o,
            g = r * _ - i * o,
            w = n * u - a * s,
            M = n * _ - i * s,
            k = a * _ - i * u,
            z = c * m - f * h,
            A = c * d - l * h,
            x = c * b - p * h,
            L = f * d - l * m,
            E = f * b - p * m,
            C = l * b - p * d,
            O = y * C - v * E + g * L + w * x - M * A + k * z;
          return O
            ? ((O = 1 / O),
              (e[0] = (s * C - u * E + _ * L) * O),
              (e[1] = (u * x - o * C - _ * A) * O),
              (e[2] = (o * E - s * x + _ * z) * O),
              (e[3] = (a * E - n * C - i * L) * O),
              (e[4] = (r * C - a * x + i * A) * O),
              (e[5] = (n * x - r * E - i * z) * O),
              (e[6] = (m * k - d * M + b * w) * O),
              (e[7] = (d * g - h * k - b * v) * O),
              (e[8] = (h * M - m * g + b * y) * O),
              e)
            : null;
        }
        function je(e, t, r) {
          return (
            (e[0] = 2 / t),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = -2 / r),
            (e[5] = 0),
            (e[6] = -1),
            (e[7] = 1),
            (e[8] = 1),
            e
          );
        }
        function Re(e) {
          return (
            "mat3(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ", " +
            e[6] +
            ", " +
            e[7] +
            ", " +
            e[8] +
            ")"
          );
        }
        function Ve(e) {
          return Math.hypot(
            e[0],
            e[1],
            e[2],
            e[3],
            e[4],
            e[5],
            e[6],
            e[7],
            e[8]
          );
        }
        function qe(e, t, r) {
          return (
            (e[0] = t[0] + r[0]),
            (e[1] = t[1] + r[1]),
            (e[2] = t[2] + r[2]),
            (e[3] = t[3] + r[3]),
            (e[4] = t[4] + r[4]),
            (e[5] = t[5] + r[5]),
            (e[6] = t[6] + r[6]),
            (e[7] = t[7] + r[7]),
            (e[8] = t[8] + r[8]),
            e
          );
        }
        function Ge(e, t, r) {
          return (
            (e[0] = t[0] - r[0]),
            (e[1] = t[1] - r[1]),
            (e[2] = t[2] - r[2]),
            (e[3] = t[3] - r[3]),
            (e[4] = t[4] - r[4]),
            (e[5] = t[5] - r[5]),
            (e[6] = t[6] - r[6]),
            (e[7] = t[7] - r[7]),
            (e[8] = t[8] - r[8]),
            e
          );
        }
        function Ne(e, t, r) {
          return (
            (e[0] = t[0] * r),
            (e[1] = t[1] * r),
            (e[2] = t[2] * r),
            (e[3] = t[3] * r),
            (e[4] = t[4] * r),
            (e[5] = t[5] * r),
            (e[6] = t[6] * r),
            (e[7] = t[7] * r),
            (e[8] = t[8] * r),
            e
          );
        }
        function Ue(e, t, r, n) {
          return (
            (e[0] = t[0] + r[0] * n),
            (e[1] = t[1] + r[1] * n),
            (e[2] = t[2] + r[2] * n),
            (e[3] = t[3] + r[3] * n),
            (e[4] = t[4] + r[4] * n),
            (e[5] = t[5] + r[5] * n),
            (e[6] = t[6] + r[6] * n),
            (e[7] = t[7] + r[7] * n),
            (e[8] = t[8] + r[8] * n),
            e
          );
        }
        function We(e, t) {
          return (
            e[0] === t[0] &&
            e[1] === t[1] &&
            e[2] === t[2] &&
            e[3] === t[3] &&
            e[4] === t[4] &&
            e[5] === t[5] &&
            e[6] === t[6] &&
            e[7] === t[7] &&
            e[8] === t[8]
          );
        }
        function He(e, t) {
          var r = e[0],
            n = e[1],
            a = e[2],
            i = e[3],
            o = e[4],
            s = e[5],
            u = e[6],
            _ = e[7],
            c = e[8],
            f = t[0],
            l = t[1],
            h = t[2],
            m = t[3],
            d = t[4],
            b = t[5],
            y = t[6],
            v = t[7],
            g = t[8];
          return (
            Math.abs(r - f) <= p * Math.max(1, Math.abs(r), Math.abs(f)) &&
            Math.abs(n - l) <= p * Math.max(1, Math.abs(n), Math.abs(l)) &&
            Math.abs(a - h) <= p * Math.max(1, Math.abs(a), Math.abs(h)) &&
            Math.abs(i - m) <= p * Math.max(1, Math.abs(i), Math.abs(m)) &&
            Math.abs(o - d) <= p * Math.max(1, Math.abs(o), Math.abs(d)) &&
            Math.abs(s - b) <= p * Math.max(1, Math.abs(s), Math.abs(b)) &&
            Math.abs(u - y) <= p * Math.max(1, Math.abs(u), Math.abs(y)) &&
            Math.abs(_ - v) <= p * Math.max(1, Math.abs(_), Math.abs(v)) &&
            Math.abs(c - g) <= p * Math.max(1, Math.abs(c), Math.abs(g))
          );
        }
        var Ze = Ee,
          Ye = Ge;
        function Xe() {
          var e = new h(16);
          return (
            h != Float32Array &&
              ((e[1] = 0),
              (e[2] = 0),
              (e[3] = 0),
              (e[4] = 0),
              (e[6] = 0),
              (e[7] = 0),
              (e[8] = 0),
              (e[9] = 0),
              (e[11] = 0),
              (e[12] = 0),
              (e[13] = 0),
              (e[14] = 0)),
            (e[0] = 1),
            (e[5] = 1),
            (e[10] = 1),
            (e[15] = 1),
            e
          );
        }
        function Ke(e) {
          var t = new h(16);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[8] = e[8]),
            (t[9] = e[9]),
            (t[10] = e[10]),
            (t[11] = e[11]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]),
            t
          );
        }
        function Je(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            (e[9] = t[9]),
            (e[10] = t[10]),
            (e[11] = t[11]),
            (e[12] = t[12]),
            (e[13] = t[13]),
            (e[14] = t[14]),
            (e[15] = t[15]),
            e
          );
        }
        function Qe(e, t, r, n, a, i, o, s, u, _, c, f, l, p, m, d) {
          var b = new h(16);
          return (
            (b[0] = e),
            (b[1] = t),
            (b[2] = r),
            (b[3] = n),
            (b[4] = a),
            (b[5] = i),
            (b[6] = o),
            (b[7] = s),
            (b[8] = u),
            (b[9] = _),
            (b[10] = c),
            (b[11] = f),
            (b[12] = l),
            (b[13] = p),
            (b[14] = m),
            (b[15] = d),
            b
          );
        }
        function $e(e, t, r, n, a, i, o, s, u, _, c, f, l, p, h, m, d) {
          return (
            (e[0] = t),
            (e[1] = r),
            (e[2] = n),
            (e[3] = a),
            (e[4] = i),
            (e[5] = o),
            (e[6] = s),
            (e[7] = u),
            (e[8] = _),
            (e[9] = c),
            (e[10] = f),
            (e[11] = l),
            (e[12] = p),
            (e[13] = h),
            (e[14] = m),
            (e[15] = d),
            e
          );
        }
        function et(e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 1),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function tt(e, t) {
          if (e === t) {
            var r = t[1],
              n = t[2],
              a = t[3],
              i = t[6],
              o = t[7],
              s = t[11];
            (e[1] = t[4]),
              (e[2] = t[8]),
              (e[3] = t[12]),
              (e[4] = r),
              (e[6] = t[9]),
              (e[7] = t[13]),
              (e[8] = n),
              (e[9] = i),
              (e[11] = t[14]),
              (e[12] = a),
              (e[13] = o),
              (e[14] = s);
          } else
            (e[0] = t[0]),
              (e[1] = t[4]),
              (e[2] = t[8]),
              (e[3] = t[12]),
              (e[4] = t[1]),
              (e[5] = t[5]),
              (e[6] = t[9]),
              (e[7] = t[13]),
              (e[8] = t[2]),
              (e[9] = t[6]),
              (e[10] = t[10]),
              (e[11] = t[14]),
              (e[12] = t[3]),
              (e[13] = t[7]),
              (e[14] = t[11]),
              (e[15] = t[15]);
          return e;
        }
        function rt(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = t[4],
            s = t[5],
            u = t[6],
            _ = t[7],
            c = t[8],
            f = t[9],
            l = t[10],
            p = t[11],
            h = t[12],
            m = t[13],
            d = t[14],
            b = t[15],
            y = r * s - n * o,
            v = r * u - a * o,
            g = r * _ - i * o,
            w = n * u - a * s,
            M = n * _ - i * s,
            k = a * _ - i * u,
            z = c * m - f * h,
            A = c * d - l * h,
            x = c * b - p * h,
            L = f * d - l * m,
            E = f * b - p * m,
            C = l * b - p * d,
            O = y * C - v * E + g * L + w * x - M * A + k * z;
          return O
            ? ((O = 1 / O),
              (e[0] = (s * C - u * E + _ * L) * O),
              (e[1] = (a * E - n * C - i * L) * O),
              (e[2] = (m * k - d * M + b * w) * O),
              (e[3] = (l * M - f * k - p * w) * O),
              (e[4] = (u * x - o * C - _ * A) * O),
              (e[5] = (r * C - a * x + i * A) * O),
              (e[6] = (d * g - h * k - b * v) * O),
              (e[7] = (c * k - l * g + p * v) * O),
              (e[8] = (o * E - s * x + _ * z) * O),
              (e[9] = (n * x - r * E - i * z) * O),
              (e[10] = (h * M - m * g + b * y) * O),
              (e[11] = (f * g - c * M - p * y) * O),
              (e[12] = (s * A - o * L - u * z) * O),
              (e[13] = (r * L - n * A + a * z) * O),
              (e[14] = (m * v - h * w - d * y) * O),
              (e[15] = (c * w - f * v + l * y) * O),
              e)
            : null;
        }
        function nt(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = t[4],
            s = t[5],
            u = t[6],
            _ = t[7],
            c = t[8],
            f = t[9],
            l = t[10],
            p = t[11],
            h = t[12],
            m = t[13],
            d = t[14],
            b = t[15];
          return (
            (e[0] =
              s * (l * b - p * d) - f * (u * b - _ * d) + m * (u * p - _ * l)),
            (e[1] = -(
              n * (l * b - p * d) -
              f * (a * b - i * d) +
              m * (a * p - i * l)
            )),
            (e[2] =
              n * (u * b - _ * d) - s * (a * b - i * d) + m * (a * _ - i * u)),
            (e[3] = -(
              n * (u * p - _ * l) -
              s * (a * p - i * l) +
              f * (a * _ - i * u)
            )),
            (e[4] = -(
              o * (l * b - p * d) -
              c * (u * b - _ * d) +
              h * (u * p - _ * l)
            )),
            (e[5] =
              r * (l * b - p * d) - c * (a * b - i * d) + h * (a * p - i * l)),
            (e[6] = -(
              r * (u * b - _ * d) -
              o * (a * b - i * d) +
              h * (a * _ - i * u)
            )),
            (e[7] =
              r * (u * p - _ * l) - o * (a * p - i * l) + c * (a * _ - i * u)),
            (e[8] =
              o * (f * b - p * m) - c * (s * b - _ * m) + h * (s * p - _ * f)),
            (e[9] = -(
              r * (f * b - p * m) -
              c * (n * b - i * m) +
              h * (n * p - i * f)
            )),
            (e[10] =
              r * (s * b - _ * m) - o * (n * b - i * m) + h * (n * _ - i * s)),
            (e[11] = -(
              r * (s * p - _ * f) -
              o * (n * p - i * f) +
              c * (n * _ - i * s)
            )),
            (e[12] = -(
              o * (f * d - l * m) -
              c * (s * d - u * m) +
              h * (s * l - u * f)
            )),
            (e[13] =
              r * (f * d - l * m) - c * (n * d - a * m) + h * (n * l - a * f)),
            (e[14] = -(
              r * (s * d - u * m) -
              o * (n * d - a * m) +
              h * (n * u - a * s)
            )),
            (e[15] =
              r * (s * l - u * f) - o * (n * l - a * f) + c * (n * u - a * s)),
            e
          );
        }
        function at(e) {
          var t = e[0],
            r = e[1],
            n = e[2],
            a = e[3],
            i = e[4],
            o = e[5],
            s = e[6],
            u = e[7],
            _ = e[8],
            c = e[9],
            f = e[10],
            l = e[11],
            p = e[12],
            h = e[13],
            m = e[14],
            d = e[15];
          return (
            (t * o - r * i) * (f * d - l * m) -
            (t * s - n * i) * (c * d - l * h) +
            (t * u - a * i) * (c * m - f * h) +
            (r * s - n * o) * (_ * d - l * p) -
            (r * u - a * o) * (_ * m - f * p) +
            (n * u - a * s) * (_ * h - c * p)
          );
        }
        function it(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = t[6],
            c = t[7],
            f = t[8],
            l = t[9],
            p = t[10],
            h = t[11],
            m = t[12],
            d = t[13],
            b = t[14],
            y = t[15],
            v = r[0],
            g = r[1],
            w = r[2],
            M = r[3];
          return (
            (e[0] = v * n + g * s + w * f + M * m),
            (e[1] = v * a + g * u + w * l + M * d),
            (e[2] = v * i + g * _ + w * p + M * b),
            (e[3] = v * o + g * c + w * h + M * y),
            (v = r[4]),
            (g = r[5]),
            (w = r[6]),
            (M = r[7]),
            (e[4] = v * n + g * s + w * f + M * m),
            (e[5] = v * a + g * u + w * l + M * d),
            (e[6] = v * i + g * _ + w * p + M * b),
            (e[7] = v * o + g * c + w * h + M * y),
            (v = r[8]),
            (g = r[9]),
            (w = r[10]),
            (M = r[11]),
            (e[8] = v * n + g * s + w * f + M * m),
            (e[9] = v * a + g * u + w * l + M * d),
            (e[10] = v * i + g * _ + w * p + M * b),
            (e[11] = v * o + g * c + w * h + M * y),
            (v = r[12]),
            (g = r[13]),
            (w = r[14]),
            (M = r[15]),
            (e[12] = v * n + g * s + w * f + M * m),
            (e[13] = v * a + g * u + w * l + M * d),
            (e[14] = v * i + g * _ + w * p + M * b),
            (e[15] = v * o + g * c + w * h + M * y),
            e
          );
        }
        function ot(e, t, r) {
          var n,
            a,
            i,
            o,
            s,
            u,
            _,
            c,
            f,
            l,
            p,
            h,
            m = r[0],
            d = r[1],
            b = r[2];
          return (
            t === e
              ? ((e[12] = t[0] * m + t[4] * d + t[8] * b + t[12]),
                (e[13] = t[1] * m + t[5] * d + t[9] * b + t[13]),
                (e[14] = t[2] * m + t[6] * d + t[10] * b + t[14]),
                (e[15] = t[3] * m + t[7] * d + t[11] * b + t[15]))
              : ((n = t[0]),
                (a = t[1]),
                (i = t[2]),
                (o = t[3]),
                (s = t[4]),
                (u = t[5]),
                (_ = t[6]),
                (c = t[7]),
                (f = t[8]),
                (l = t[9]),
                (p = t[10]),
                (h = t[11]),
                (e[0] = n),
                (e[1] = a),
                (e[2] = i),
                (e[3] = o),
                (e[4] = s),
                (e[5] = u),
                (e[6] = _),
                (e[7] = c),
                (e[8] = f),
                (e[9] = l),
                (e[10] = p),
                (e[11] = h),
                (e[12] = n * m + s * d + f * b + t[12]),
                (e[13] = a * m + u * d + l * b + t[13]),
                (e[14] = i * m + _ * d + p * b + t[14]),
                (e[15] = o * m + c * d + h * b + t[15])),
            e
          );
        }
        function st(e, t, r) {
          var n = r[0],
            a = r[1],
            i = r[2];
          return (
            (e[0] = t[0] * n),
            (e[1] = t[1] * n),
            (e[2] = t[2] * n),
            (e[3] = t[3] * n),
            (e[4] = t[4] * a),
            (e[5] = t[5] * a),
            (e[6] = t[6] * a),
            (e[7] = t[7] * a),
            (e[8] = t[8] * i),
            (e[9] = t[9] * i),
            (e[10] = t[10] * i),
            (e[11] = t[11] * i),
            (e[12] = t[12]),
            (e[13] = t[13]),
            (e[14] = t[14]),
            (e[15] = t[15]),
            e
          );
        }
        function ut(e, t, r, n) {
          var a,
            i,
            o,
            s,
            u,
            _,
            c,
            f,
            l,
            h,
            m,
            d,
            b,
            y,
            v,
            g,
            w,
            M,
            k,
            z,
            A,
            x,
            L,
            E,
            C = n[0],
            O = n[1],
            S = n[2],
            T = Math.hypot(C, O, S);
          return T < p
            ? null
            : ((C *= T = 1 / T),
              (O *= T),
              (S *= T),
              (a = Math.sin(r)),
              (o = 1 - (i = Math.cos(r))),
              (s = t[0]),
              (u = t[1]),
              (_ = t[2]),
              (c = t[3]),
              (f = t[4]),
              (l = t[5]),
              (h = t[6]),
              (m = t[7]),
              (d = t[8]),
              (b = t[9]),
              (y = t[10]),
              (v = t[11]),
              (g = C * C * o + i),
              (w = O * C * o + S * a),
              (M = S * C * o - O * a),
              (k = C * O * o - S * a),
              (z = O * O * o + i),
              (A = S * O * o + C * a),
              (x = C * S * o + O * a),
              (L = O * S * o - C * a),
              (E = S * S * o + i),
              (e[0] = s * g + f * w + d * M),
              (e[1] = u * g + l * w + b * M),
              (e[2] = _ * g + h * w + y * M),
              (e[3] = c * g + m * w + v * M),
              (e[4] = s * k + f * z + d * A),
              (e[5] = u * k + l * z + b * A),
              (e[6] = _ * k + h * z + y * A),
              (e[7] = c * k + m * z + v * A),
              (e[8] = s * x + f * L + d * E),
              (e[9] = u * x + l * L + b * E),
              (e[10] = _ * x + h * L + y * E),
              (e[11] = c * x + m * L + v * E),
              t !== e &&
                ((e[12] = t[12]),
                (e[13] = t[13]),
                (e[14] = t[14]),
                (e[15] = t[15])),
              e);
        }
        function _t(e, t, r) {
          var n = Math.sin(r),
            a = Math.cos(r),
            i = t[4],
            o = t[5],
            s = t[6],
            u = t[7],
            _ = t[8],
            c = t[9],
            f = t[10],
            l = t[11];
          return (
            t !== e &&
              ((e[0] = t[0]),
              (e[1] = t[1]),
              (e[2] = t[2]),
              (e[3] = t[3]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[4] = i * a + _ * n),
            (e[5] = o * a + c * n),
            (e[6] = s * a + f * n),
            (e[7] = u * a + l * n),
            (e[8] = _ * a - i * n),
            (e[9] = c * a - o * n),
            (e[10] = f * a - s * n),
            (e[11] = l * a - u * n),
            e
          );
        }
        function ct(e, t, r) {
          var n = Math.sin(r),
            a = Math.cos(r),
            i = t[0],
            o = t[1],
            s = t[2],
            u = t[3],
            _ = t[8],
            c = t[9],
            f = t[10],
            l = t[11];
          return (
            t !== e &&
              ((e[4] = t[4]),
              (e[5] = t[5]),
              (e[6] = t[6]),
              (e[7] = t[7]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = i * a - _ * n),
            (e[1] = o * a - c * n),
            (e[2] = s * a - f * n),
            (e[3] = u * a - l * n),
            (e[8] = i * n + _ * a),
            (e[9] = o * n + c * a),
            (e[10] = s * n + f * a),
            (e[11] = u * n + l * a),
            e
          );
        }
        function ft(e, t, r) {
          var n = Math.sin(r),
            a = Math.cos(r),
            i = t[0],
            o = t[1],
            s = t[2],
            u = t[3],
            _ = t[4],
            c = t[5],
            f = t[6],
            l = t[7];
          return (
            t !== e &&
              ((e[8] = t[8]),
              (e[9] = t[9]),
              (e[10] = t[10]),
              (e[11] = t[11]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = i * a + _ * n),
            (e[1] = o * a + c * n),
            (e[2] = s * a + f * n),
            (e[3] = u * a + l * n),
            (e[4] = _ * a - i * n),
            (e[5] = c * a - o * n),
            (e[6] = f * a - s * n),
            (e[7] = l * a - u * n),
            e
          );
        }
        function lt(e, t) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 1),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = t[0]),
            (e[13] = t[1]),
            (e[14] = t[2]),
            (e[15] = 1),
            e
          );
        }
        function pt(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = t[1]),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = t[2]),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function ht(e, t, r) {
          var n,
            a,
            i,
            o = r[0],
            s = r[1],
            u = r[2],
            _ = Math.hypot(o, s, u);
          return _ < p
            ? null
            : ((o *= _ = 1 / _),
              (s *= _),
              (u *= _),
              (n = Math.sin(t)),
              (i = 1 - (a = Math.cos(t))),
              (e[0] = o * o * i + a),
              (e[1] = s * o * i + u * n),
              (e[2] = u * o * i - s * n),
              (e[3] = 0),
              (e[4] = o * s * i - u * n),
              (e[5] = s * s * i + a),
              (e[6] = u * s * i + o * n),
              (e[7] = 0),
              (e[8] = o * u * i + s * n),
              (e[9] = s * u * i - o * n),
              (e[10] = u * u * i + a),
              (e[11] = 0),
              (e[12] = 0),
              (e[13] = 0),
              (e[14] = 0),
              (e[15] = 1),
              e);
        }
        function mt(e, t) {
          var r = Math.sin(t),
            n = Math.cos(t);
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = n),
            (e[6] = r),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = -r),
            (e[10] = n),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function dt(e, t) {
          var r = Math.sin(t),
            n = Math.cos(t);
          return (
            (e[0] = n),
            (e[1] = 0),
            (e[2] = -r),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 1),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = r),
            (e[9] = 0),
            (e[10] = n),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function bt(e, t) {
          var r = Math.sin(t),
            n = Math.cos(t);
          return (
            (e[0] = n),
            (e[1] = r),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = -r),
            (e[5] = n),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function yt(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = n + n,
            u = a + a,
            _ = i + i,
            c = n * s,
            f = n * u,
            l = n * _,
            p = a * u,
            h = a * _,
            m = i * _,
            d = o * s,
            b = o * u,
            y = o * _;
          return (
            (e[0] = 1 - (p + m)),
            (e[1] = f + y),
            (e[2] = l - b),
            (e[3] = 0),
            (e[4] = f - y),
            (e[5] = 1 - (c + m)),
            (e[6] = h + d),
            (e[7] = 0),
            (e[8] = l + b),
            (e[9] = h - d),
            (e[10] = 1 - (c + p)),
            (e[11] = 0),
            (e[12] = r[0]),
            (e[13] = r[1]),
            (e[14] = r[2]),
            (e[15] = 1),
            e
          );
        }
        function vt(e, t) {
          var r = new h(3),
            n = -t[0],
            a = -t[1],
            i = -t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = t[6],
            c = t[7],
            f = n * n + a * a + i * i + o * o;
          return (
            f > 0
              ? ((r[0] = (2 * (s * o + c * n + u * i - _ * a)) / f),
                (r[1] = (2 * (u * o + c * a + _ * n - s * i)) / f),
                (r[2] = (2 * (_ * o + c * i + s * a - u * n)) / f))
              : ((r[0] = 2 * (s * o + c * n + u * i - _ * a)),
                (r[1] = 2 * (u * o + c * a + _ * n - s * i)),
                (r[2] = 2 * (_ * o + c * i + s * a - u * n))),
            yt(e, t, r),
            e
          );
        }
        function gt(e, t) {
          return (e[0] = t[12]), (e[1] = t[13]), (e[2] = t[14]), e;
        }
        function wt(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[4],
            o = t[5],
            s = t[6],
            u = t[8],
            _ = t[9],
            c = t[10];
          return (
            (e[0] = Math.hypot(r, n, a)),
            (e[1] = Math.hypot(i, o, s)),
            (e[2] = Math.hypot(u, _, c)),
            e
          );
        }
        function Mt(e, t) {
          var r = new h(3);
          wt(r, t);
          var n = 1 / r[0],
            a = 1 / r[1],
            i = 1 / r[2],
            o = t[0] * n,
            s = t[1] * a,
            u = t[2] * i,
            _ = t[4] * n,
            c = t[5] * a,
            f = t[6] * i,
            l = t[8] * n,
            p = t[9] * a,
            m = t[10] * i,
            d = o + c + m,
            b = 0;
          return (
            d > 0
              ? ((b = 2 * Math.sqrt(d + 1)),
                (e[3] = 0.25 * b),
                (e[0] = (f - p) / b),
                (e[1] = (l - u) / b),
                (e[2] = (s - _) / b))
              : o > c && o > m
              ? ((b = 2 * Math.sqrt(1 + o - c - m)),
                (e[3] = (f - p) / b),
                (e[0] = 0.25 * b),
                (e[1] = (s + _) / b),
                (e[2] = (l + u) / b))
              : c > m
              ? ((b = 2 * Math.sqrt(1 + c - o - m)),
                (e[3] = (l - u) / b),
                (e[0] = (s + _) / b),
                (e[1] = 0.25 * b),
                (e[2] = (f + p) / b))
              : ((b = 2 * Math.sqrt(1 + m - o - c)),
                (e[3] = (s - _) / b),
                (e[0] = (l + u) / b),
                (e[1] = (f + p) / b),
                (e[2] = 0.25 * b)),
            e
          );
        }
        function kt(e, t, r, n) {
          var a = t[0],
            i = t[1],
            o = t[2],
            s = t[3],
            u = a + a,
            _ = i + i,
            c = o + o,
            f = a * u,
            l = a * _,
            p = a * c,
            h = i * _,
            m = i * c,
            d = o * c,
            b = s * u,
            y = s * _,
            v = s * c,
            g = n[0],
            w = n[1],
            M = n[2];
          return (
            (e[0] = (1 - (h + d)) * g),
            (e[1] = (l + v) * g),
            (e[2] = (p - y) * g),
            (e[3] = 0),
            (e[4] = (l - v) * w),
            (e[5] = (1 - (f + d)) * w),
            (e[6] = (m + b) * w),
            (e[7] = 0),
            (e[8] = (p + y) * M),
            (e[9] = (m - b) * M),
            (e[10] = (1 - (f + h)) * M),
            (e[11] = 0),
            (e[12] = r[0]),
            (e[13] = r[1]),
            (e[14] = r[2]),
            (e[15] = 1),
            e
          );
        }
        function zt(e, t, r, n, a) {
          var i = t[0],
            o = t[1],
            s = t[2],
            u = t[3],
            _ = i + i,
            c = o + o,
            f = s + s,
            l = i * _,
            p = i * c,
            h = i * f,
            m = o * c,
            d = o * f,
            b = s * f,
            y = u * _,
            v = u * c,
            g = u * f,
            w = n[0],
            M = n[1],
            k = n[2],
            z = a[0],
            A = a[1],
            x = a[2],
            L = (1 - (m + b)) * w,
            E = (p + g) * w,
            C = (h - v) * w,
            O = (p - g) * M,
            S = (1 - (l + b)) * M,
            T = (d + y) * M,
            P = (h + v) * k,
            I = (d - y) * k,
            B = (1 - (l + m)) * k;
          return (
            (e[0] = L),
            (e[1] = E),
            (e[2] = C),
            (e[3] = 0),
            (e[4] = O),
            (e[5] = S),
            (e[6] = T),
            (e[7] = 0),
            (e[8] = P),
            (e[9] = I),
            (e[10] = B),
            (e[11] = 0),
            (e[12] = r[0] + z - (L * z + O * A + P * x)),
            (e[13] = r[1] + A - (E * z + S * A + I * x)),
            (e[14] = r[2] + x - (C * z + T * A + B * x)),
            (e[15] = 1),
            e
          );
        }
        function At(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = r + r,
            s = n + n,
            u = a + a,
            _ = r * o,
            c = n * o,
            f = n * s,
            l = a * o,
            p = a * s,
            h = a * u,
            m = i * o,
            d = i * s,
            b = i * u;
          return (
            (e[0] = 1 - f - h),
            (e[1] = c + b),
            (e[2] = l - d),
            (e[3] = 0),
            (e[4] = c - b),
            (e[5] = 1 - _ - h),
            (e[6] = p + m),
            (e[7] = 0),
            (e[8] = l + d),
            (e[9] = p - m),
            (e[10] = 1 - _ - f),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function xt(e, t, r, n, a, i, o) {
          var s = 1 / (r - t),
            u = 1 / (a - n),
            _ = 1 / (i - o);
          return (
            (e[0] = 2 * i * s),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 2 * i * u),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = (r + t) * s),
            (e[9] = (a + n) * u),
            (e[10] = (o + i) * _),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = o * i * 2 * _),
            (e[15] = 0),
            e
          );
        }
        function Lt(e, t, r, n, a) {
          var i,
            o = 1 / Math.tan(t / 2);
          return (
            (e[0] = o / r),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = o),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[15] = 0),
            null != a && a !== 1 / 0
              ? ((i = 1 / (n - a)),
                (e[10] = (a + n) * i),
                (e[14] = 2 * a * n * i))
              : ((e[10] = -1), (e[14] = -2 * n)),
            e
          );
        }
        function Et(e, t, r, n) {
          var a = Math.tan((t.upDegrees * Math.PI) / 180),
            i = Math.tan((t.downDegrees * Math.PI) / 180),
            o = Math.tan((t.leftDegrees * Math.PI) / 180),
            s = Math.tan((t.rightDegrees * Math.PI) / 180),
            u = 2 / (o + s),
            _ = 2 / (a + i);
          return (
            (e[0] = u),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = _),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = -(o - s) * u * 0.5),
            (e[9] = (a - i) * _ * 0.5),
            (e[10] = n / (r - n)),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = (n * r) / (r - n)),
            (e[15] = 0),
            e
          );
        }
        function Ct(e, t, r, n, a, i, o) {
          var s = 1 / (t - r),
            u = 1 / (n - a),
            _ = 1 / (i - o);
          return (
            (e[0] = -2 * s),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = -2 * u),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 2 * _),
            (e[11] = 0),
            (e[12] = (t + r) * s),
            (e[13] = (a + n) * u),
            (e[14] = (o + i) * _),
            (e[15] = 1),
            e
          );
        }
        function Ot(e, t, r, n) {
          var a,
            i,
            o,
            s,
            u,
            _,
            c,
            f,
            l,
            h,
            m = t[0],
            d = t[1],
            b = t[2],
            y = n[0],
            v = n[1],
            g = n[2],
            w = r[0],
            M = r[1],
            k = r[2];
          return Math.abs(m - w) < p &&
            Math.abs(d - M) < p &&
            Math.abs(b - k) < p
            ? et(e)
            : ((c = m - w),
              (f = d - M),
              (l = b - k),
              (a = v * (l *= h = 1 / Math.hypot(c, f, l)) - g * (f *= h)),
              (i = g * (c *= h) - y * l),
              (o = y * f - v * c),
              (h = Math.hypot(a, i, o))
                ? ((a *= h = 1 / h), (i *= h), (o *= h))
                : ((a = 0), (i = 0), (o = 0)),
              (s = f * o - l * i),
              (u = l * a - c * o),
              (_ = c * i - f * a),
              (h = Math.hypot(s, u, _))
                ? ((s *= h = 1 / h), (u *= h), (_ *= h))
                : ((s = 0), (u = 0), (_ = 0)),
              (e[0] = a),
              (e[1] = s),
              (e[2] = c),
              (e[3] = 0),
              (e[4] = i),
              (e[5] = u),
              (e[6] = f),
              (e[7] = 0),
              (e[8] = o),
              (e[9] = _),
              (e[10] = l),
              (e[11] = 0),
              (e[12] = -(a * m + i * d + o * b)),
              (e[13] = -(s * m + u * d + _ * b)),
              (e[14] = -(c * m + f * d + l * b)),
              (e[15] = 1),
              e);
        }
        function St(e, t, r, n) {
          var a = t[0],
            i = t[1],
            o = t[2],
            s = n[0],
            u = n[1],
            _ = n[2],
            c = a - r[0],
            f = i - r[1],
            l = o - r[2],
            p = c * c + f * f + l * l;
          p > 0 && ((c *= p = 1 / Math.sqrt(p)), (f *= p), (l *= p));
          var h = u * l - _ * f,
            m = _ * c - s * l,
            d = s * f - u * c;
          return (
            (p = h * h + m * m + d * d) > 0 &&
              ((h *= p = 1 / Math.sqrt(p)), (m *= p), (d *= p)),
            (e[0] = h),
            (e[1] = m),
            (e[2] = d),
            (e[3] = 0),
            (e[4] = f * d - l * m),
            (e[5] = l * h - c * d),
            (e[6] = c * m - f * h),
            (e[7] = 0),
            (e[8] = c),
            (e[9] = f),
            (e[10] = l),
            (e[11] = 0),
            (e[12] = a),
            (e[13] = i),
            (e[14] = o),
            (e[15] = 1),
            e
          );
        }
        function Tt(e) {
          return (
            "mat4(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ", " +
            e[6] +
            ", " +
            e[7] +
            ", " +
            e[8] +
            ", " +
            e[9] +
            ", " +
            e[10] +
            ", " +
            e[11] +
            ", " +
            e[12] +
            ", " +
            e[13] +
            ", " +
            e[14] +
            ", " +
            e[15] +
            ")"
          );
        }
        function Pt(e) {
          return Math.hypot(
            e[0],
            e[1],
            e[3],
            e[4],
            e[5],
            e[6],
            e[7],
            e[8],
            e[9],
            e[10],
            e[11],
            e[12],
            e[13],
            e[14],
            e[15]
          );
        }
        function It(e, t, r) {
          return (
            (e[0] = t[0] + r[0]),
            (e[1] = t[1] + r[1]),
            (e[2] = t[2] + r[2]),
            (e[3] = t[3] + r[3]),
            (e[4] = t[4] + r[4]),
            (e[5] = t[5] + r[5]),
            (e[6] = t[6] + r[6]),
            (e[7] = t[7] + r[7]),
            (e[8] = t[8] + r[8]),
            (e[9] = t[9] + r[9]),
            (e[10] = t[10] + r[10]),
            (e[11] = t[11] + r[11]),
            (e[12] = t[12] + r[12]),
            (e[13] = t[13] + r[13]),
            (e[14] = t[14] + r[14]),
            (e[15] = t[15] + r[15]),
            e
          );
        }
        function Bt(e, t, r) {
          return (
            (e[0] = t[0] - r[0]),
            (e[1] = t[1] - r[1]),
            (e[2] = t[2] - r[2]),
            (e[3] = t[3] - r[3]),
            (e[4] = t[4] - r[4]),
            (e[5] = t[5] - r[5]),
            (e[6] = t[6] - r[6]),
            (e[7] = t[7] - r[7]),
            (e[8] = t[8] - r[8]),
            (e[9] = t[9] - r[9]),
            (e[10] = t[10] - r[10]),
            (e[11] = t[11] - r[11]),
            (e[12] = t[12] - r[12]),
            (e[13] = t[13] - r[13]),
            (e[14] = t[14] - r[14]),
            (e[15] = t[15] - r[15]),
            e
          );
        }
        function Ft(e, t, r) {
          return (
            (e[0] = t[0] * r),
            (e[1] = t[1] * r),
            (e[2] = t[2] * r),
            (e[3] = t[3] * r),
            (e[4] = t[4] * r),
            (e[5] = t[5] * r),
            (e[6] = t[6] * r),
            (e[7] = t[7] * r),
            (e[8] = t[8] * r),
            (e[9] = t[9] * r),
            (e[10] = t[10] * r),
            (e[11] = t[11] * r),
            (e[12] = t[12] * r),
            (e[13] = t[13] * r),
            (e[14] = t[14] * r),
            (e[15] = t[15] * r),
            e
          );
        }
        function Dt(e, t, r, n) {
          return (
            (e[0] = t[0] + r[0] * n),
            (e[1] = t[1] + r[1] * n),
            (e[2] = t[2] + r[2] * n),
            (e[3] = t[3] + r[3] * n),
            (e[4] = t[4] + r[4] * n),
            (e[5] = t[5] + r[5] * n),
            (e[6] = t[6] + r[6] * n),
            (e[7] = t[7] + r[7] * n),
            (e[8] = t[8] + r[8] * n),
            (e[9] = t[9] + r[9] * n),
            (e[10] = t[10] + r[10] * n),
            (e[11] = t[11] + r[11] * n),
            (e[12] = t[12] + r[12] * n),
            (e[13] = t[13] + r[13] * n),
            (e[14] = t[14] + r[14] * n),
            (e[15] = t[15] + r[15] * n),
            e
          );
        }
        function jt(e, t) {
          return (
            e[0] === t[0] &&
            e[1] === t[1] &&
            e[2] === t[2] &&
            e[3] === t[3] &&
            e[4] === t[4] &&
            e[5] === t[5] &&
            e[6] === t[6] &&
            e[7] === t[7] &&
            e[8] === t[8] &&
            e[9] === t[9] &&
            e[10] === t[10] &&
            e[11] === t[11] &&
            e[12] === t[12] &&
            e[13] === t[13] &&
            e[14] === t[14] &&
            e[15] === t[15]
          );
        }
        function Rt(e, t) {
          var r = e[0],
            n = e[1],
            a = e[2],
            i = e[3],
            o = e[4],
            s = e[5],
            u = e[6],
            _ = e[7],
            c = e[8],
            f = e[9],
            l = e[10],
            h = e[11],
            m = e[12],
            d = e[13],
            b = e[14],
            y = e[15],
            v = t[0],
            g = t[1],
            w = t[2],
            M = t[3],
            k = t[4],
            z = t[5],
            A = t[6],
            x = t[7],
            L = t[8],
            E = t[9],
            C = t[10],
            O = t[11],
            S = t[12],
            T = t[13],
            P = t[14],
            I = t[15];
          return (
            Math.abs(r - v) <= p * Math.max(1, Math.abs(r), Math.abs(v)) &&
            Math.abs(n - g) <= p * Math.max(1, Math.abs(n), Math.abs(g)) &&
            Math.abs(a - w) <= p * Math.max(1, Math.abs(a), Math.abs(w)) &&
            Math.abs(i - M) <= p * Math.max(1, Math.abs(i), Math.abs(M)) &&
            Math.abs(o - k) <= p * Math.max(1, Math.abs(o), Math.abs(k)) &&
            Math.abs(s - z) <= p * Math.max(1, Math.abs(s), Math.abs(z)) &&
            Math.abs(u - A) <= p * Math.max(1, Math.abs(u), Math.abs(A)) &&
            Math.abs(_ - x) <= p * Math.max(1, Math.abs(_), Math.abs(x)) &&
            Math.abs(c - L) <= p * Math.max(1, Math.abs(c), Math.abs(L)) &&
            Math.abs(f - E) <= p * Math.max(1, Math.abs(f), Math.abs(E)) &&
            Math.abs(l - C) <= p * Math.max(1, Math.abs(l), Math.abs(C)) &&
            Math.abs(h - O) <= p * Math.max(1, Math.abs(h), Math.abs(O)) &&
            Math.abs(m - S) <= p * Math.max(1, Math.abs(m), Math.abs(S)) &&
            Math.abs(d - T) <= p * Math.max(1, Math.abs(d), Math.abs(T)) &&
            Math.abs(b - P) <= p * Math.max(1, Math.abs(b), Math.abs(P)) &&
            Math.abs(y - I) <= p * Math.max(1, Math.abs(y), Math.abs(I))
          );
        }
        var Vt = it,
          qt = Bt;
        function Gt() {
          var e = new h(3);
          return h != Float32Array && ((e[0] = 0), (e[1] = 0), (e[2] = 0)), e;
        }
        function Nt(e) {
          var t = new h(3);
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t;
        }
        function Ut(e) {
          var t = e[0],
            r = e[1],
            n = e[2];
          return Math.hypot(t, r, n);
        }
        function Wt(e, t, r) {
          var n = new h(3);
          return (n[0] = e), (n[1] = t), (n[2] = r), n;
        }
        function Ht(e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
        }
        function Zt(e, t, r, n) {
          return (e[0] = t), (e[1] = r), (e[2] = n), e;
        }
        function Yt(e, t, r) {
          return (
            (e[0] = t[0] + r[0]), (e[1] = t[1] + r[1]), (e[2] = t[2] + r[2]), e
          );
        }
        function Xt(e, t, r) {
          return (
            (e[0] = t[0] - r[0]), (e[1] = t[1] - r[1]), (e[2] = t[2] - r[2]), e
          );
        }
        function Kt(e, t, r) {
          return (
            (e[0] = t[0] * r[0]), (e[1] = t[1] * r[1]), (e[2] = t[2] * r[2]), e
          );
        }
        function Jt(e, t, r) {
          return (
            (e[0] = t[0] / r[0]), (e[1] = t[1] / r[1]), (e[2] = t[2] / r[2]), e
          );
        }
        function Qt(e, t) {
          return (
            (e[0] = Math.ceil(t[0])),
            (e[1] = Math.ceil(t[1])),
            (e[2] = Math.ceil(t[2])),
            e
          );
        }
        function $t(e, t) {
          return (
            (e[0] = Math.floor(t[0])),
            (e[1] = Math.floor(t[1])),
            (e[2] = Math.floor(t[2])),
            e
          );
        }
        function er(e, t, r) {
          return (
            (e[0] = Math.min(t[0], r[0])),
            (e[1] = Math.min(t[1], r[1])),
            (e[2] = Math.min(t[2], r[2])),
            e
          );
        }
        function tr(e, t, r) {
          return (
            (e[0] = Math.max(t[0], r[0])),
            (e[1] = Math.max(t[1], r[1])),
            (e[2] = Math.max(t[2], r[2])),
            e
          );
        }
        function rr(e, t) {
          return (
            (e[0] = Math.round(t[0])),
            (e[1] = Math.round(t[1])),
            (e[2] = Math.round(t[2])),
            e
          );
        }
        function nr(e, t, r) {
          return (e[0] = t[0] * r), (e[1] = t[1] * r), (e[2] = t[2] * r), e;
        }
        function ar(e, t, r, n) {
          return (
            (e[0] = t[0] + r[0] * n),
            (e[1] = t[1] + r[1] * n),
            (e[2] = t[2] + r[2] * n),
            e
          );
        }
        function ir(e, t) {
          var r = t[0] - e[0],
            n = t[1] - e[1],
            a = t[2] - e[2];
          return Math.hypot(r, n, a);
        }
        function or(e, t) {
          var r = t[0] - e[0],
            n = t[1] - e[1],
            a = t[2] - e[2];
          return r * r + n * n + a * a;
        }
        function sr(e) {
          var t = e[0],
            r = e[1],
            n = e[2];
          return t * t + r * r + n * n;
        }
        function ur(e, t) {
          return (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), e;
        }
        function _r(e, t) {
          return (e[0] = 1 / t[0]), (e[1] = 1 / t[1]), (e[2] = 1 / t[2]), e;
        }
        function cr(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = r * r + n * n + a * a;
          return (
            i > 0 && (i = 1 / Math.sqrt(i)),
            (e[0] = t[0] * i),
            (e[1] = t[1] * i),
            (e[2] = t[2] * i),
            e
          );
        }
        function fr(e, t) {
          return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
        }
        function lr(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = r[0],
            s = r[1],
            u = r[2];
          return (
            (e[0] = a * u - i * s),
            (e[1] = i * o - n * u),
            (e[2] = n * s - a * o),
            e
          );
        }
        function pr(e, t, r, n) {
          var a = t[0],
            i = t[1],
            o = t[2];
          return (
            (e[0] = a + n * (r[0] - a)),
            (e[1] = i + n * (r[1] - i)),
            (e[2] = o + n * (r[2] - o)),
            e
          );
        }
        function hr(e, t, r, n, a, i) {
          var o = i * i,
            s = o * (2 * i - 3) + 1,
            u = o * (i - 2) + i,
            _ = o * (i - 1),
            c = o * (3 - 2 * i);
          return (
            (e[0] = t[0] * s + r[0] * u + n[0] * _ + a[0] * c),
            (e[1] = t[1] * s + r[1] * u + n[1] * _ + a[1] * c),
            (e[2] = t[2] * s + r[2] * u + n[2] * _ + a[2] * c),
            e
          );
        }
        function mr(e, t, r, n, a, i) {
          var o = 1 - i,
            s = o * o,
            u = i * i,
            _ = s * o,
            c = 3 * i * s,
            f = 3 * u * o,
            l = u * i;
          return (
            (e[0] = t[0] * _ + r[0] * c + n[0] * f + a[0] * l),
            (e[1] = t[1] * _ + r[1] * c + n[1] * f + a[1] * l),
            (e[2] = t[2] * _ + r[2] * c + n[2] * f + a[2] * l),
            e
          );
        }
        function dr(e, t) {
          t = t || 1;
          var r = 2 * m() * Math.PI,
            n = 2 * m() - 1,
            a = Math.sqrt(1 - n * n) * t;
          return (
            (e[0] = Math.cos(r) * a),
            (e[1] = Math.sin(r) * a),
            (e[2] = n * t),
            e
          );
        }
        function br(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = r[3] * n + r[7] * a + r[11] * i + r[15];
          return (
            (o = o || 1),
            (e[0] = (r[0] * n + r[4] * a + r[8] * i + r[12]) / o),
            (e[1] = (r[1] * n + r[5] * a + r[9] * i + r[13]) / o),
            (e[2] = (r[2] * n + r[6] * a + r[10] * i + r[14]) / o),
            e
          );
        }
        function yr(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2];
          return (
            (e[0] = n * r[0] + a * r[3] + i * r[6]),
            (e[1] = n * r[1] + a * r[4] + i * r[7]),
            (e[2] = n * r[2] + a * r[5] + i * r[8]),
            e
          );
        }
        function vr(e, t, r) {
          var n = r[0],
            a = r[1],
            i = r[2],
            o = r[3],
            s = t[0],
            u = t[1],
            _ = t[2],
            c = a * _ - i * u,
            f = i * s - n * _,
            l = n * u - a * s,
            p = a * l - i * f,
            h = i * c - n * l,
            m = n * f - a * c,
            d = 2 * o;
          return (
            (c *= d),
            (f *= d),
            (l *= d),
            (p *= 2),
            (h *= 2),
            (m *= 2),
            (e[0] = s + c + p),
            (e[1] = u + f + h),
            (e[2] = _ + l + m),
            e
          );
        }
        function gr(e, t, r, n) {
          var a = [],
            i = [];
          return (
            (a[0] = t[0] - r[0]),
            (a[1] = t[1] - r[1]),
            (a[2] = t[2] - r[2]),
            (i[0] = a[0]),
            (i[1] = a[1] * Math.cos(n) - a[2] * Math.sin(n)),
            (i[2] = a[1] * Math.sin(n) + a[2] * Math.cos(n)),
            (e[0] = i[0] + r[0]),
            (e[1] = i[1] + r[1]),
            (e[2] = i[2] + r[2]),
            e
          );
        }
        function wr(e, t, r, n) {
          var a = [],
            i = [];
          return (
            (a[0] = t[0] - r[0]),
            (a[1] = t[1] - r[1]),
            (a[2] = t[2] - r[2]),
            (i[0] = a[2] * Math.sin(n) + a[0] * Math.cos(n)),
            (i[1] = a[1]),
            (i[2] = a[2] * Math.cos(n) - a[0] * Math.sin(n)),
            (e[0] = i[0] + r[0]),
            (e[1] = i[1] + r[1]),
            (e[2] = i[2] + r[2]),
            e
          );
        }
        function Mr(e, t, r, n) {
          var a = [],
            i = [];
          return (
            (a[0] = t[0] - r[0]),
            (a[1] = t[1] - r[1]),
            (a[2] = t[2] - r[2]),
            (i[0] = a[0] * Math.cos(n) - a[1] * Math.sin(n)),
            (i[1] = a[0] * Math.sin(n) + a[1] * Math.cos(n)),
            (i[2] = a[2]),
            (e[0] = i[0] + r[0]),
            (e[1] = i[1] + r[1]),
            (e[2] = i[2] + r[2]),
            e
          );
        }
        function kr(e, t) {
          var r = Wt(e[0], e[1], e[2]),
            n = Wt(t[0], t[1], t[2]);
          cr(r, r), cr(n, n);
          var a = fr(r, n);
          return a > 1 ? 0 : a < -1 ? Math.PI : Math.acos(a);
        }
        function zr(e) {
          return (e[0] = 0), (e[1] = 0), (e[2] = 0), e;
        }
        function Ar(e) {
          return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
        }
        function xr(e, t) {
          return e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
        }
        function Lr(e, t) {
          var r = e[0],
            n = e[1],
            a = e[2],
            i = t[0],
            o = t[1],
            s = t[2];
          return (
            Math.abs(r - i) <= p * Math.max(1, Math.abs(r), Math.abs(i)) &&
            Math.abs(n - o) <= p * Math.max(1, Math.abs(n), Math.abs(o)) &&
            Math.abs(a - s) <= p * Math.max(1, Math.abs(a), Math.abs(s))
          );
        }
        var Er,
          Cr = Xt,
          Or = Kt,
          Sr = Jt,
          Tr = ir,
          Pr = or,
          Ir = Ut,
          Br = sr,
          Fr =
            ((Er = Gt()),
            function (e, t, r, n, a, i) {
              var o, s;
              for (
                t || (t = 3),
                  r || (r = 0),
                  s = n ? Math.min(n * t + r, e.length) : e.length,
                  o = r;
                o < s;
                o += t
              )
                (Er[0] = e[o]),
                  (Er[1] = e[o + 1]),
                  (Er[2] = e[o + 2]),
                  a(Er, Er, i),
                  (e[o] = Er[0]),
                  (e[o + 1] = Er[1]),
                  (e[o + 2] = Er[2]);
              return e;
            });
        function Dr() {
          var e = new h(4);
          return (
            h != Float32Array &&
              ((e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0)),
            e
          );
        }
        function jr(e) {
          var t = new h(4);
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
        }
        function Rr(e, t, r, n) {
          var a = new h(4);
          return (a[0] = e), (a[1] = t), (a[2] = r), (a[3] = n), a;
        }
        function Vr(e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
        }
        function qr(e, t, r, n, a) {
          return (e[0] = t), (e[1] = r), (e[2] = n), (e[3] = a), e;
        }
        function Gr(e, t, r) {
          return (
            (e[0] = t[0] + r[0]),
            (e[1] = t[1] + r[1]),
            (e[2] = t[2] + r[2]),
            (e[3] = t[3] + r[3]),
            e
          );
        }
        function Nr(e, t, r) {
          return (
            (e[0] = t[0] - r[0]),
            (e[1] = t[1] - r[1]),
            (e[2] = t[2] - r[2]),
            (e[3] = t[3] - r[3]),
            e
          );
        }
        function Ur(e, t, r) {
          return (
            (e[0] = t[0] * r[0]),
            (e[1] = t[1] * r[1]),
            (e[2] = t[2] * r[2]),
            (e[3] = t[3] * r[3]),
            e
          );
        }
        function Wr(e, t, r) {
          return (
            (e[0] = t[0] / r[0]),
            (e[1] = t[1] / r[1]),
            (e[2] = t[2] / r[2]),
            (e[3] = t[3] / r[3]),
            e
          );
        }
        function Hr(e, t) {
          return (
            (e[0] = Math.ceil(t[0])),
            (e[1] = Math.ceil(t[1])),
            (e[2] = Math.ceil(t[2])),
            (e[3] = Math.ceil(t[3])),
            e
          );
        }
        function Zr(e, t) {
          return (
            (e[0] = Math.floor(t[0])),
            (e[1] = Math.floor(t[1])),
            (e[2] = Math.floor(t[2])),
            (e[3] = Math.floor(t[3])),
            e
          );
        }
        function Yr(e, t, r) {
          return (
            (e[0] = Math.min(t[0], r[0])),
            (e[1] = Math.min(t[1], r[1])),
            (e[2] = Math.min(t[2], r[2])),
            (e[3] = Math.min(t[3], r[3])),
            e
          );
        }
        function Xr(e, t, r) {
          return (
            (e[0] = Math.max(t[0], r[0])),
            (e[1] = Math.max(t[1], r[1])),
            (e[2] = Math.max(t[2], r[2])),
            (e[3] = Math.max(t[3], r[3])),
            e
          );
        }
        function Kr(e, t) {
          return (
            (e[0] = Math.round(t[0])),
            (e[1] = Math.round(t[1])),
            (e[2] = Math.round(t[2])),
            (e[3] = Math.round(t[3])),
            e
          );
        }
        function Jr(e, t, r) {
          return (
            (e[0] = t[0] * r),
            (e[1] = t[1] * r),
            (e[2] = t[2] * r),
            (e[3] = t[3] * r),
            e
          );
        }
        function Qr(e, t, r, n) {
          return (
            (e[0] = t[0] + r[0] * n),
            (e[1] = t[1] + r[1] * n),
            (e[2] = t[2] + r[2] * n),
            (e[3] = t[3] + r[3] * n),
            e
          );
        }
        function $r(e, t) {
          var r = t[0] - e[0],
            n = t[1] - e[1],
            a = t[2] - e[2],
            i = t[3] - e[3];
          return Math.hypot(r, n, a, i);
        }
        function en(e, t) {
          var r = t[0] - e[0],
            n = t[1] - e[1],
            a = t[2] - e[2],
            i = t[3] - e[3];
          return r * r + n * n + a * a + i * i;
        }
        function tn(e) {
          var t = e[0],
            r = e[1],
            n = e[2],
            a = e[3];
          return Math.hypot(t, r, n, a);
        }
        function rn(e) {
          var t = e[0],
            r = e[1],
            n = e[2],
            a = e[3];
          return t * t + r * r + n * n + a * a;
        }
        function nn(e, t) {
          return (
            (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = -t[3]), e
          );
        }
        function an(e, t) {
          return (
            (e[0] = 1 / t[0]),
            (e[1] = 1 / t[1]),
            (e[2] = 1 / t[2]),
            (e[3] = 1 / t[3]),
            e
          );
        }
        function on(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = r * r + n * n + a * a + i * i;
          return (
            o > 0 && (o = 1 / Math.sqrt(o)),
            (e[0] = r * o),
            (e[1] = n * o),
            (e[2] = a * o),
            (e[3] = i * o),
            e
          );
        }
        function sn(e, t) {
          return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
        }
        function un(e, t, r, n) {
          var a = r[0] * n[1] - r[1] * n[0],
            i = r[0] * n[2] - r[2] * n[0],
            o = r[0] * n[3] - r[3] * n[0],
            s = r[1] * n[2] - r[2] * n[1],
            u = r[1] * n[3] - r[3] * n[1],
            _ = r[2] * n[3] - r[3] * n[2],
            c = t[0],
            f = t[1],
            l = t[2],
            p = t[3];
          return (
            (e[0] = f * _ - l * u + p * s),
            (e[1] = -c * _ + l * o - p * i),
            (e[2] = c * u - f * o + p * a),
            (e[3] = -c * s + f * i - l * a),
            e
          );
        }
        function _n(e, t, r, n) {
          var a = t[0],
            i = t[1],
            o = t[2],
            s = t[3];
          return (
            (e[0] = a + n * (r[0] - a)),
            (e[1] = i + n * (r[1] - i)),
            (e[2] = o + n * (r[2] - o)),
            (e[3] = s + n * (r[3] - s)),
            e
          );
        }
        function cn(e, t) {
          var r, n, a, i, o, s;
          t = t || 1;
          do {
            o = (r = 2 * m() - 1) * r + (n = 2 * m() - 1) * n;
          } while (o >= 1);
          do {
            s = (a = 2 * m() - 1) * a + (i = 2 * m() - 1) * i;
          } while (s >= 1);
          var u = Math.sqrt((1 - o) / s);
          return (
            (e[0] = t * r),
            (e[1] = t * n),
            (e[2] = t * a * u),
            (e[3] = t * i * u),
            e
          );
        }
        function fn(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3];
          return (
            (e[0] = r[0] * n + r[4] * a + r[8] * i + r[12] * o),
            (e[1] = r[1] * n + r[5] * a + r[9] * i + r[13] * o),
            (e[2] = r[2] * n + r[6] * a + r[10] * i + r[14] * o),
            (e[3] = r[3] * n + r[7] * a + r[11] * i + r[15] * o),
            e
          );
        }
        function ln(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = r[0],
            s = r[1],
            u = r[2],
            _ = r[3],
            c = _ * n + s * i - u * a,
            f = _ * a + u * n - o * i,
            l = _ * i + o * a - s * n,
            p = -o * n - s * a - u * i;
          return (
            (e[0] = c * _ + p * -o + f * -u - l * -s),
            (e[1] = f * _ + p * -s + l * -o - c * -u),
            (e[2] = l * _ + p * -u + c * -s - f * -o),
            (e[3] = t[3]),
            e
          );
        }
        function pn(e) {
          return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0), e;
        }
        function hn(e) {
          return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
        }
        function mn(e, t) {
          return (
            e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
          );
        }
        function dn(e, t) {
          var r = e[0],
            n = e[1],
            a = e[2],
            i = e[3],
            o = t[0],
            s = t[1],
            u = t[2],
            _ = t[3];
          return (
            Math.abs(r - o) <= p * Math.max(1, Math.abs(r), Math.abs(o)) &&
            Math.abs(n - s) <= p * Math.max(1, Math.abs(n), Math.abs(s)) &&
            Math.abs(a - u) <= p * Math.max(1, Math.abs(a), Math.abs(u)) &&
            Math.abs(i - _) <= p * Math.max(1, Math.abs(i), Math.abs(_))
          );
        }
        var bn = Nr,
          yn = Ur,
          vn = Wr,
          gn = $r,
          wn = en,
          Mn = tn,
          kn = rn,
          zn = (function () {
            var e = Dr();
            return function (t, r, n, a, i, o) {
              var s, u;
              for (
                r || (r = 4),
                  n || (n = 0),
                  u = a ? Math.min(a * r + n, t.length) : t.length,
                  s = n;
                s < u;
                s += r
              )
                (e[0] = t[s]),
                  (e[1] = t[s + 1]),
                  (e[2] = t[s + 2]),
                  (e[3] = t[s + 3]),
                  i(e, e, o),
                  (t[s] = e[0]),
                  (t[s + 1] = e[1]),
                  (t[s + 2] = e[2]),
                  (t[s + 3] = e[3]);
              return t;
            };
          })();
        function An() {
          var e = new h(4);
          return (
            h != Float32Array && ((e[0] = 0), (e[1] = 0), (e[2] = 0)),
            (e[3] = 1),
            e
          );
        }
        function xn(e) {
          return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
        }
        function Ln(e, t, r) {
          r *= 0.5;
          var n = Math.sin(r);
          return (
            (e[0] = n * t[0]),
            (e[1] = n * t[1]),
            (e[2] = n * t[2]),
            (e[3] = Math.cos(r)),
            e
          );
        }
        function En(e, t) {
          var r = 2 * Math.acos(t[3]),
            n = Math.sin(r / 2);
          return (
            n > p
              ? ((e[0] = t[0] / n), (e[1] = t[1] / n), (e[2] = t[2] / n))
              : ((e[0] = 1), (e[1] = 0), (e[2] = 0)),
            r
          );
        }
        function Cn(e, t) {
          var r = aa(e, t);
          return Math.acos(2 * r * r - 1);
        }
        function On(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = r[0],
            u = r[1],
            _ = r[2],
            c = r[3];
          return (
            (e[0] = n * c + o * s + a * _ - i * u),
            (e[1] = a * c + o * u + i * s - n * _),
            (e[2] = i * c + o * _ + n * u - a * s),
            (e[3] = o * c - n * s - a * u - i * _),
            e
          );
        }
        function Sn(e, t, r) {
          r *= 0.5;
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = Math.sin(r),
            u = Math.cos(r);
          return (
            (e[0] = n * u + o * s),
            (e[1] = a * u + i * s),
            (e[2] = i * u - a * s),
            (e[3] = o * u - n * s),
            e
          );
        }
        function Tn(e, t, r) {
          r *= 0.5;
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = Math.sin(r),
            u = Math.cos(r);
          return (
            (e[0] = n * u - i * s),
            (e[1] = a * u + o * s),
            (e[2] = i * u + n * s),
            (e[3] = o * u - a * s),
            e
          );
        }
        function Pn(e, t, r) {
          r *= 0.5;
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = Math.sin(r),
            u = Math.cos(r);
          return (
            (e[0] = n * u + a * s),
            (e[1] = a * u - n * s),
            (e[2] = i * u + o * s),
            (e[3] = o * u - i * s),
            e
          );
        }
        function In(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2];
          return (
            (e[0] = r),
            (e[1] = n),
            (e[2] = a),
            (e[3] = Math.sqrt(Math.abs(1 - r * r - n * n - a * a))),
            e
          );
        }
        function Bn(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = Math.sqrt(r * r + n * n + a * a),
            s = Math.exp(i),
            u = o > 0 ? (s * Math.sin(o)) / o : 0;
          return (
            (e[0] = r * u),
            (e[1] = n * u),
            (e[2] = a * u),
            (e[3] = s * Math.cos(o)),
            e
          );
        }
        function Fn(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = Math.sqrt(r * r + n * n + a * a),
            s = o > 0 ? Math.atan2(o, i) / o : 0;
          return (
            (e[0] = r * s),
            (e[1] = n * s),
            (e[2] = a * s),
            (e[3] = 0.5 * Math.log(r * r + n * n + a * a + i * i)),
            e
          );
        }
        function Dn(e, t, r) {
          return Fn(e, t), na(e, e, r), Bn(e, e), e;
        }
        function jn(e, t, r, n) {
          var a,
            i,
            o,
            s,
            u,
            _ = t[0],
            c = t[1],
            f = t[2],
            l = t[3],
            h = r[0],
            m = r[1],
            d = r[2],
            b = r[3];
          return (
            (i = _ * h + c * m + f * d + l * b) < 0 &&
              ((i = -i), (h = -h), (m = -m), (d = -d), (b = -b)),
            1 - i > p
              ? ((a = Math.acos(i)),
                (o = Math.sin(a)),
                (s = Math.sin((1 - n) * a) / o),
                (u = Math.sin(n * a) / o))
              : ((s = 1 - n), (u = n)),
            (e[0] = s * _ + u * h),
            (e[1] = s * c + u * m),
            (e[2] = s * f + u * d),
            (e[3] = s * l + u * b),
            e
          );
        }
        function Rn(e) {
          var t = m(),
            r = m(),
            n = m(),
            a = Math.sqrt(1 - t),
            i = Math.sqrt(t);
          return (
            (e[0] = a * Math.sin(2 * Math.PI * r)),
            (e[1] = a * Math.cos(2 * Math.PI * r)),
            (e[2] = i * Math.sin(2 * Math.PI * n)),
            (e[3] = i * Math.cos(2 * Math.PI * n)),
            e
          );
        }
        function Vn(e, t) {
          var r = t[0],
            n = t[1],
            a = t[2],
            i = t[3],
            o = r * r + n * n + a * a + i * i,
            s = o ? 1 / o : 0;
          return (
            (e[0] = -r * s), (e[1] = -n * s), (e[2] = -a * s), (e[3] = i * s), e
          );
        }
        function qn(e, t) {
          return (
            (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = t[3]), e
          );
        }
        function Gn(e, t) {
          var r,
            n = t[0] + t[4] + t[8];
          if (n > 0)
            (r = Math.sqrt(n + 1)),
              (e[3] = 0.5 * r),
              (r = 0.5 / r),
              (e[0] = (t[5] - t[7]) * r),
              (e[1] = (t[6] - t[2]) * r),
              (e[2] = (t[1] - t[3]) * r);
          else {
            var a = 0;
            t[4] > t[0] && (a = 1), t[8] > t[3 * a + a] && (a = 2);
            var i = (a + 1) % 3,
              o = (a + 2) % 3;
            (r = Math.sqrt(t[3 * a + a] - t[3 * i + i] - t[3 * o + o] + 1)),
              (e[a] = 0.5 * r),
              (r = 0.5 / r),
              (e[3] = (t[3 * i + o] - t[3 * o + i]) * r),
              (e[i] = (t[3 * i + a] + t[3 * a + i]) * r),
              (e[o] = (t[3 * o + a] + t[3 * a + o]) * r);
          }
          return e;
        }
        function Nn(e, t, r, n) {
          var a = (0.5 * Math.PI) / 180;
          (t *= a), (r *= a), (n *= a);
          var i = Math.sin(t),
            o = Math.cos(t),
            s = Math.sin(r),
            u = Math.cos(r),
            _ = Math.sin(n),
            c = Math.cos(n);
          return (
            (e[0] = i * u * c - o * s * _),
            (e[1] = o * s * c + i * u * _),
            (e[2] = o * u * _ - i * s * c),
            (e[3] = o * u * c + i * s * _),
            e
          );
        }
        function Un(e) {
          return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
        }
        var Wn,
          Hn,
          Zn,
          Yn,
          Xn,
          Kn,
          Jn = jr,
          Qn = Rr,
          $n = Vr,
          ea = qr,
          ta = Gr,
          ra = On,
          na = Jr,
          aa = sn,
          ia = _n,
          oa = tn,
          sa = oa,
          ua = rn,
          _a = ua,
          ca = on,
          fa = mn,
          la = dn,
          pa =
            ((Wn = Gt()),
            (Hn = Wt(1, 0, 0)),
            (Zn = Wt(0, 1, 0)),
            function (e, t, r) {
              var n = fr(t, r);
              return n < -0.999999
                ? (lr(Wn, Hn, t),
                  Ir(Wn) < 1e-6 && lr(Wn, Zn, t),
                  cr(Wn, Wn),
                  Ln(e, Wn, Math.PI),
                  e)
                : n > 0.999999
                ? ((e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 1), e)
                : (lr(Wn, t, r),
                  (e[0] = Wn[0]),
                  (e[1] = Wn[1]),
                  (e[2] = Wn[2]),
                  (e[3] = 1 + n),
                  ca(e, e));
            }),
          ha =
            ((Yn = An()),
            (Xn = An()),
            function (e, t, r, n, a, i) {
              return (
                jn(Yn, t, a, i),
                jn(Xn, r, n, i),
                jn(e, Yn, Xn, 2 * i * (1 - i)),
                e
              );
            }),
          ma =
            ((Kn = be()),
            function (e, t, r, n) {
              return (
                (Kn[0] = r[0]),
                (Kn[3] = r[1]),
                (Kn[6] = r[2]),
                (Kn[1] = n[0]),
                (Kn[4] = n[1]),
                (Kn[7] = n[2]),
                (Kn[2] = -t[0]),
                (Kn[5] = -t[1]),
                (Kn[8] = -t[2]),
                ca(e, Gn(e, Kn))
              );
            });
        function da() {
          var e = new h(8);
          return (
            h != Float32Array &&
              ((e[0] = 0),
              (e[1] = 0),
              (e[2] = 0),
              (e[4] = 0),
              (e[5] = 0),
              (e[6] = 0),
              (e[7] = 0)),
            (e[3] = 1),
            e
          );
        }
        function ba(e) {
          var t = new h(8);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            t
          );
        }
        function ya(e, t, r, n, a, i, o, s) {
          var u = new h(8);
          return (
            (u[0] = e),
            (u[1] = t),
            (u[2] = r),
            (u[3] = n),
            (u[4] = a),
            (u[5] = i),
            (u[6] = o),
            (u[7] = s),
            u
          );
        }
        function va(e, t, r, n, a, i, o) {
          var s = new h(8);
          (s[0] = e), (s[1] = t), (s[2] = r), (s[3] = n);
          var u = 0.5 * a,
            _ = 0.5 * i,
            c = 0.5 * o;
          return (
            (s[4] = u * n + _ * r - c * t),
            (s[5] = _ * n + c * e - u * r),
            (s[6] = c * n + u * t - _ * e),
            (s[7] = -u * e - _ * t - c * r),
            s
          );
        }
        function ga(e, t, r) {
          var n = 0.5 * r[0],
            a = 0.5 * r[1],
            i = 0.5 * r[2],
            o = t[0],
            s = t[1],
            u = t[2],
            _ = t[3];
          return (
            (e[0] = o),
            (e[1] = s),
            (e[2] = u),
            (e[3] = _),
            (e[4] = n * _ + a * u - i * s),
            (e[5] = a * _ + i * o - n * u),
            (e[6] = i * _ + n * s - a * o),
            (e[7] = -n * o - a * s - i * u),
            e
          );
        }
        function wa(e, t) {
          return (
            (e[0] = 0),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 1),
            (e[4] = 0.5 * t[0]),
            (e[5] = 0.5 * t[1]),
            (e[6] = 0.5 * t[2]),
            (e[7] = 0),
            e
          );
        }
        function Ma(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = 0),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            e
          );
        }
        function ka(e, t) {
          var r = An();
          Mt(r, t);
          var n = new h(3);
          return gt(n, t), ga(e, r, n), e;
        }
        function za(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            e
          );
        }
        function Aa(e) {
          return (
            (e[0] = 0),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 1),
            (e[4] = 0),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            e
          );
        }
        function xa(e, t, r, n, a, i, o, s, u) {
          return (
            (e[0] = t),
            (e[1] = r),
            (e[2] = n),
            (e[3] = a),
            (e[4] = i),
            (e[5] = o),
            (e[6] = s),
            (e[7] = u),
            e
          );
        }
        var La = $n;
        function Ea(e, t) {
          return (e[0] = t[4]), (e[1] = t[5]), (e[2] = t[6]), (e[3] = t[7]), e;
        }
        var Ca = $n;
        function Oa(e, t) {
          return (e[4] = t[0]), (e[5] = t[1]), (e[6] = t[2]), (e[7] = t[3]), e;
        }
        function Sa(e, t) {
          var r = t[4],
            n = t[5],
            a = t[6],
            i = t[7],
            o = -t[0],
            s = -t[1],
            u = -t[2],
            _ = t[3];
          return (
            (e[0] = 2 * (r * _ + i * o + n * u - a * s)),
            (e[1] = 2 * (n * _ + i * s + a * o - r * u)),
            (e[2] = 2 * (a * _ + i * u + r * s - n * o)),
            e
          );
        }
        function Ta(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = 0.5 * r[0],
            u = 0.5 * r[1],
            _ = 0.5 * r[2],
            c = t[4],
            f = t[5],
            l = t[6],
            p = t[7];
          return (
            (e[0] = n),
            (e[1] = a),
            (e[2] = i),
            (e[3] = o),
            (e[4] = o * s + a * _ - i * u + c),
            (e[5] = o * u + i * s - n * _ + f),
            (e[6] = o * _ + n * u - a * s + l),
            (e[7] = -n * s - a * u - i * _ + p),
            e
          );
        }
        function Pa(e, t, r) {
          var n = -t[0],
            a = -t[1],
            i = -t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = t[6],
            c = t[7],
            f = s * o + c * n + u * i - _ * a,
            l = u * o + c * a + _ * n - s * i,
            p = _ * o + c * i + s * a - u * n,
            h = c * o - s * n - u * a - _ * i;
          return (
            Sn(e, t, r),
            (n = e[0]),
            (a = e[1]),
            (i = e[2]),
            (o = e[3]),
            (e[4] = f * o + h * n + l * i - p * a),
            (e[5] = l * o + h * a + p * n - f * i),
            (e[6] = p * o + h * i + f * a - l * n),
            (e[7] = h * o - f * n - l * a - p * i),
            e
          );
        }
        function Ia(e, t, r) {
          var n = -t[0],
            a = -t[1],
            i = -t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = t[6],
            c = t[7],
            f = s * o + c * n + u * i - _ * a,
            l = u * o + c * a + _ * n - s * i,
            p = _ * o + c * i + s * a - u * n,
            h = c * o - s * n - u * a - _ * i;
          return (
            Tn(e, t, r),
            (n = e[0]),
            (a = e[1]),
            (i = e[2]),
            (o = e[3]),
            (e[4] = f * o + h * n + l * i - p * a),
            (e[5] = l * o + h * a + p * n - f * i),
            (e[6] = p * o + h * i + f * a - l * n),
            (e[7] = h * o - f * n - l * a - p * i),
            e
          );
        }
        function Ba(e, t, r) {
          var n = -t[0],
            a = -t[1],
            i = -t[2],
            o = t[3],
            s = t[4],
            u = t[5],
            _ = t[6],
            c = t[7],
            f = s * o + c * n + u * i - _ * a,
            l = u * o + c * a + _ * n - s * i,
            p = _ * o + c * i + s * a - u * n,
            h = c * o - s * n - u * a - _ * i;
          return (
            Pn(e, t, r),
            (n = e[0]),
            (a = e[1]),
            (i = e[2]),
            (o = e[3]),
            (e[4] = f * o + h * n + l * i - p * a),
            (e[5] = l * o + h * a + p * n - f * i),
            (e[6] = p * o + h * i + f * a - l * n),
            (e[7] = h * o - f * n - l * a - p * i),
            e
          );
        }
        function Fa(e, t, r) {
          var n = r[0],
            a = r[1],
            i = r[2],
            o = r[3],
            s = t[0],
            u = t[1],
            _ = t[2],
            c = t[3];
          return (
            (e[0] = s * o + c * n + u * i - _ * a),
            (e[1] = u * o + c * a + _ * n - s * i),
            (e[2] = _ * o + c * i + s * a - u * n),
            (e[3] = c * o - s * n - u * a - _ * i),
            (s = t[4]),
            (u = t[5]),
            (_ = t[6]),
            (c = t[7]),
            (e[4] = s * o + c * n + u * i - _ * a),
            (e[5] = u * o + c * a + _ * n - s * i),
            (e[6] = _ * o + c * i + s * a - u * n),
            (e[7] = c * o - s * n - u * a - _ * i),
            e
          );
        }
        function Da(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = r[0],
            u = r[1],
            _ = r[2],
            c = r[3];
          return (
            (e[0] = n * c + o * s + a * _ - i * u),
            (e[1] = a * c + o * u + i * s - n * _),
            (e[2] = i * c + o * _ + n * u - a * s),
            (e[3] = o * c - n * s - a * u - i * _),
            (s = r[4]),
            (u = r[5]),
            (_ = r[6]),
            (c = r[7]),
            (e[4] = n * c + o * s + a * _ - i * u),
            (e[5] = a * c + o * u + i * s - n * _),
            (e[6] = i * c + o * _ + n * u - a * s),
            (e[7] = o * c - n * s - a * u - i * _),
            e
          );
        }
        function ja(e, t, r, n) {
          if (Math.abs(n) < p) return za(e, t);
          var a = Math.hypot(r[0], r[1], r[2]);
          n *= 0.5;
          var i = Math.sin(n),
            o = (i * r[0]) / a,
            s = (i * r[1]) / a,
            u = (i * r[2]) / a,
            _ = Math.cos(n),
            c = t[0],
            f = t[1],
            l = t[2],
            h = t[3];
          (e[0] = c * _ + h * o + f * u - l * s),
            (e[1] = f * _ + h * s + l * o - c * u),
            (e[2] = l * _ + h * u + c * s - f * o),
            (e[3] = h * _ - c * o - f * s - l * u);
          var m = t[4],
            d = t[5],
            b = t[6],
            y = t[7];
          return (
            (e[4] = m * _ + y * o + d * u - b * s),
            (e[5] = d * _ + y * s + b * o - m * u),
            (e[6] = b * _ + y * u + m * s - d * o),
            (e[7] = y * _ - m * o - d * s - b * u),
            e
          );
        }
        function Ra(e, t, r) {
          return (
            (e[0] = t[0] + r[0]),
            (e[1] = t[1] + r[1]),
            (e[2] = t[2] + r[2]),
            (e[3] = t[3] + r[3]),
            (e[4] = t[4] + r[4]),
            (e[5] = t[5] + r[5]),
            (e[6] = t[6] + r[6]),
            (e[7] = t[7] + r[7]),
            e
          );
        }
        function Va(e, t, r) {
          var n = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            s = r[4],
            u = r[5],
            _ = r[6],
            c = r[7],
            f = t[4],
            l = t[5],
            p = t[6],
            h = t[7],
            m = r[0],
            d = r[1],
            b = r[2],
            y = r[3];
          return (
            (e[0] = n * y + o * m + a * b - i * d),
            (e[1] = a * y + o * d + i * m - n * b),
            (e[2] = i * y + o * b + n * d - a * m),
            (e[3] = o * y - n * m - a * d - i * b),
            (e[4] =
              n * c + o * s + a * _ - i * u + f * y + h * m + l * b - p * d),
            (e[5] =
              a * c + o * u + i * s - n * _ + l * y + h * d + p * m - f * b),
            (e[6] =
              i * c + o * _ + n * u - a * s + p * y + h * b + f * d - l * m),
            (e[7] =
              o * c - n * s - a * u - i * _ + h * y - f * m - l * d - p * b),
            e
          );
        }
        var qa = Va;
        function Ga(e, t, r) {
          return (
            (e[0] = t[0] * r),
            (e[1] = t[1] * r),
            (e[2] = t[2] * r),
            (e[3] = t[3] * r),
            (e[4] = t[4] * r),
            (e[5] = t[5] * r),
            (e[6] = t[6] * r),
            (e[7] = t[7] * r),
            e
          );
        }
        var Na = aa;
        function Ua(e, t, r, n) {
          var a = 1 - n;
          return (
            Na(t, r) < 0 && (n = -n),
            (e[0] = t[0] * a + r[0] * n),
            (e[1] = t[1] * a + r[1] * n),
            (e[2] = t[2] * a + r[2] * n),
            (e[3] = t[3] * a + r[3] * n),
            (e[4] = t[4] * a + r[4] * n),
            (e[5] = t[5] * a + r[5] * n),
            (e[6] = t[6] * a + r[6] * n),
            (e[7] = t[7] * a + r[7] * n),
            e
          );
        }
        function Wa(e, t) {
          var r = Xa(t);
          return (
            (e[0] = -t[0] / r),
            (e[1] = -t[1] / r),
            (e[2] = -t[2] / r),
            (e[3] = t[3] / r),
            (e[4] = -t[4] / r),
            (e[5] = -t[5] / r),
            (e[6] = -t[6] / r),
            (e[7] = t[7] / r),
            e
          );
        }
        function Ha(e, t) {
          return (
            (e[0] = -t[0]),
            (e[1] = -t[1]),
            (e[2] = -t[2]),
            (e[3] = t[3]),
            (e[4] = -t[4]),
            (e[5] = -t[5]),
            (e[6] = -t[6]),
            (e[7] = t[7]),
            e
          );
        }
        var Za = oa,
          Ya = Za,
          Xa = ua,
          Ka = Xa;
        function Ja(e, t) {
          var r = Xa(t);
          if (r > 0) {
            r = Math.sqrt(r);
            var n = t[0] / r,
              a = t[1] / r,
              i = t[2] / r,
              o = t[3] / r,
              s = t[4],
              u = t[5],
              _ = t[6],
              c = t[7],
              f = n * s + a * u + i * _ + o * c;
            (e[0] = n),
              (e[1] = a),
              (e[2] = i),
              (e[3] = o),
              (e[4] = (s - n * f) / r),
              (e[5] = (u - a * f) / r),
              (e[6] = (_ - i * f) / r),
              (e[7] = (c - o * f) / r);
          }
          return e;
        }
        function Qa(e) {
          return (
            "quat2(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ", " +
            e[6] +
            ", " +
            e[7] +
            ")"
          );
        }
        function $a(e, t) {
          return (
            e[0] === t[0] &&
            e[1] === t[1] &&
            e[2] === t[2] &&
            e[3] === t[3] &&
            e[4] === t[4] &&
            e[5] === t[5] &&
            e[6] === t[6] &&
            e[7] === t[7]
          );
        }
        function ei(e, t) {
          var r = e[0],
            n = e[1],
            a = e[2],
            i = e[3],
            o = e[4],
            s = e[5],
            u = e[6],
            _ = e[7],
            c = t[0],
            f = t[1],
            l = t[2],
            h = t[3],
            m = t[4],
            d = t[5],
            b = t[6],
            y = t[7];
          return (
            Math.abs(r - c) <= p * Math.max(1, Math.abs(r), Math.abs(c)) &&
            Math.abs(n - f) <= p * Math.max(1, Math.abs(n), Math.abs(f)) &&
            Math.abs(a - l) <= p * Math.max(1, Math.abs(a), Math.abs(l)) &&
            Math.abs(i - h) <= p * Math.max(1, Math.abs(i), Math.abs(h)) &&
            Math.abs(o - m) <= p * Math.max(1, Math.abs(o), Math.abs(m)) &&
            Math.abs(s - d) <= p * Math.max(1, Math.abs(s), Math.abs(d)) &&
            Math.abs(u - b) <= p * Math.max(1, Math.abs(u), Math.abs(b)) &&
            Math.abs(_ - y) <= p * Math.max(1, Math.abs(_), Math.abs(y))
          );
        }
        function ti() {
          var e = new h(2);
          return h != Float32Array && ((e[0] = 0), (e[1] = 0)), e;
        }
        function ri(e) {
          var t = new h(2);
          return (t[0] = e[0]), (t[1] = e[1]), t;
        }
        function ni(e, t) {
          var r = new h(2);
          return (r[0] = e), (r[1] = t), r;
        }
        function ai(e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), e;
        }
        function ii(e, t, r) {
          return (e[0] = t), (e[1] = r), e;
        }
        function oi(e, t, r) {
          return (e[0] = t[0] + r[0]), (e[1] = t[1] + r[1]), e;
        }
        function si(e, t, r) {
          return (e[0] = t[0] - r[0]), (e[1] = t[1] - r[1]), e;
        }
        function ui(e, t, r) {
          return (e[0] = t[0] * r[0]), (e[1] = t[1] * r[1]), e;
        }
        function _i(e, t, r) {
          return (e[0] = t[0] / r[0]), (e[1] = t[1] / r[1]), e;
        }
        function ci(e, t) {
          return (e[0] = Math.ceil(t[0])), (e[1] = Math.ceil(t[1])), e;
        }
        function fi(e, t) {
          return (e[0] = Math.floor(t[0])), (e[1] = Math.floor(t[1])), e;
        }
        function li(e, t, r) {
          return (
            (e[0] = Math.min(t[0], r[0])), (e[1] = Math.min(t[1], r[1])), e
          );
        }
        function pi(e, t, r) {
          return (
            (e[0] = Math.max(t[0], r[0])), (e[1] = Math.max(t[1], r[1])), e
          );
        }
        function hi(e, t) {
          return (e[0] = Math.round(t[0])), (e[1] = Math.round(t[1])), e;
        }
        function mi(e, t, r) {
          return (e[0] = t[0] * r), (e[1] = t[1] * r), e;
        }
        function di(e, t, r, n) {
          return (e[0] = t[0] + r[0] * n), (e[1] = t[1] + r[1] * n), e;
        }
        function bi(e, t) {
          var r = t[0] - e[0],
            n = t[1] - e[1];
          return Math.hypot(r, n);
        }
        function yi(e, t) {
          var r = t[0] - e[0],
            n = t[1] - e[1];
          return r * r + n * n;
        }
        function vi(e) {
          var t = e[0],
            r = e[1];
          return Math.hypot(t, r);
        }
        function gi(e) {
          var t = e[0],
            r = e[1];
          return t * t + r * r;
        }
        function wi(e, t) {
          return (e[0] = -t[0]), (e[1] = -t[1]), e;
        }
        function Mi(e, t) {
          return (e[0] = 1 / t[0]), (e[1] = 1 / t[1]), e;
        }
        function ki(e, t) {
          var r = t[0],
            n = t[1],
            a = r * r + n * n;
          return (
            a > 0 && (a = 1 / Math.sqrt(a)),
            (e[0] = t[0] * a),
            (e[1] = t[1] * a),
            e
          );
        }
        function zi(e, t) {
          return e[0] * t[0] + e[1] * t[1];
        }
        function Ai(e, t, r) {
          var n = t[0] * r[1] - t[1] * r[0];
          return (e[0] = e[1] = 0), (e[2] = n), e;
        }
        function xi(e, t, r, n) {
          var a = t[0],
            i = t[1];
          return (e[0] = a + n * (r[0] - a)), (e[1] = i + n * (r[1] - i)), e;
        }
        function Li(e, t) {
          t = t || 1;
          var r = 2 * m() * Math.PI;
          return (e[0] = Math.cos(r) * t), (e[1] = Math.sin(r) * t), e;
        }
        function Ei(e, t, r) {
          var n = t[0],
            a = t[1];
          return (e[0] = r[0] * n + r[2] * a), (e[1] = r[1] * n + r[3] * a), e;
        }
        function Ci(e, t, r) {
          var n = t[0],
            a = t[1];
          return (
            (e[0] = r[0] * n + r[2] * a + r[4]),
            (e[1] = r[1] * n + r[3] * a + r[5]),
            e
          );
        }
        function Oi(e, t, r) {
          var n = t[0],
            a = t[1];
          return (
            (e[0] = r[0] * n + r[3] * a + r[6]),
            (e[1] = r[1] * n + r[4] * a + r[7]),
            e
          );
        }
        function Si(e, t, r) {
          var n = t[0],
            a = t[1];
          return (
            (e[0] = r[0] * n + r[4] * a + r[12]),
            (e[1] = r[1] * n + r[5] * a + r[13]),
            e
          );
        }
        function Ti(e, t, r, n) {
          var a = t[0] - r[0],
            i = t[1] - r[1],
            o = Math.sin(n),
            s = Math.cos(n);
          return (
            (e[0] = a * s - i * o + r[0]), (e[1] = a * o + i * s + r[1]), e
          );
        }
        function Pi(e, t) {
          var r = e[0],
            n = e[1],
            a = t[0],
            i = t[1],
            o = r * r + n * n;
          o > 0 && (o = 1 / Math.sqrt(o));
          var s = a * a + i * i;
          s > 0 && (s = 1 / Math.sqrt(s));
          var u = (r * a + n * i) * o * s;
          return u > 1 ? 0 : u < -1 ? Math.PI : Math.acos(u);
        }
        function Ii(e) {
          return (e[0] = 0), (e[1] = 0), e;
        }
        function Bi(e) {
          return "vec2(" + e[0] + ", " + e[1] + ")";
        }
        function Fi(e, t) {
          return e[0] === t[0] && e[1] === t[1];
        }
        function Di(e, t) {
          var r = e[0],
            n = e[1],
            a = t[0],
            i = t[1];
          return (
            Math.abs(r - a) <= p * Math.max(1, Math.abs(r), Math.abs(a)) &&
            Math.abs(n - i) <= p * Math.max(1, Math.abs(n), Math.abs(i))
          );
        }
        var ji = vi,
          Ri = si,
          Vi = ui,
          qi = _i,
          Gi = bi,
          Ni = yi,
          Ui = gi,
          Wi = (function () {
            var e = ti();
            return function (t, r, n, a, i, o) {
              var s, u;
              for (
                r || (r = 2),
                  n || (n = 0),
                  u = a ? Math.min(a * r + n, t.length) : t.length,
                  s = n;
                s < u;
                s += r
              )
                (e[0] = t[s]),
                  (e[1] = t[s + 1]),
                  i(e, e, o),
                  (t[s] = e[0]),
                  (t[s + 1] = e[1]);
              return t;
            };
          })();
      },
    },
    t = {};
  function r(n) {
    var a = t[n];
    if (void 0 !== a) return a.exports;
    var i = (t[n] = { exports: {} });
    return e[n].call(i.exports, i, i.exports, r), i.exports;
  }
  (r.d = (e, t) => {
    for (var n in t)
      r.o(t, n) &&
        !r.o(e, n) &&
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
  }),
    (r.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      var e;
      r.g.importScripts && (e = r.g.location + "");
      var t = r.g.document;
      if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
        var n = t.getElementsByTagName("script");
        n.length && (e = n[n.length - 1].src);
      }
      if (!e)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (e = e
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (r.p = e);
    })(),
    (() => {
      const e = r(248),
        t = self;
      e.messageManager.onOutgoingMessage.bind(() => {
        let r = e.messageManager.getOutgoingMessages();
        for (let e of r) t.postMessage(e.msg, e.transferables);
      });
      let n = (a) => {
        if (a && a.data && "wasm" === a.data.t) {
          let i = location.href.startsWith("blob") ? a.data.url : r(740);
          i.default && (i = i.default),
            e.launchWorkerServer(i),
            t.removeEventListener("message", n);
        }
      };
      t.addEventListener("message", n),
        t.addEventListener("message", (t) => {
          e.messageManager.postIncomingMessage(t.data);
        });
    })();
})();
