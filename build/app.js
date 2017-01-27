/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "c8b4805f4c62d8b8c150"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotMainModule = true; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			hotMainModule = false;
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		Object.defineProperty(fn, "e", {
/******/ 			enumerable: true,
/******/ 			value: function(chunkId) {
/******/ 				if(hotStatus === "ready")
/******/ 					hotSetStatus("prepare");
/******/ 				hotChunksLoading++;
/******/ 				return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 					finishChunkLoading();
/******/ 					throw err;
/******/ 				});
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		});
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotMainModule,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotMainModule = true;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				}
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					}
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						}
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(10)(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.component.scss":
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ "./app/app.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        styles: [__webpack_require__("./app/app.component.scss")],
        template: "\n        <router-outlet></router-outlet>\n    "
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;


/***/ },

/***/ "./app/app.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(9);
var router_1 = __webpack_require__(2);
var http_1 = __webpack_require__(3);
var forms_1 = __webpack_require__(7);
var data_service_1 = __webpack_require__("./app/data.service.ts");
var auth_service_1 = __webpack_require__("./app/auth.service.ts");
var app_component_1 = __webpack_require__("./app/app.component.ts");
var header_component_1 = __webpack_require__("./app/header/header.component.ts");
var footer_component_1 = __webpack_require__("./app/footer/footer.component.ts");
var dashboard_component_1 = __webpack_require__("./app/dashboard/dashboard.component.ts");
var login_component_1 = __webpack_require__("./app/login/login.component.ts");
var idea_component_1 = __webpack_require__("./app/idea/idea.component.ts");
// need to finish phase'd approach to idea list
var phase_1_0_component_1 = __webpack_require__("./app/idea/phase-1/phase-1-0.component.ts");
var phase_1_1_component_1 = __webpack_require__("./app/idea/phase-1/phase-1-1.component.ts");
var phase_2_0_component_1 = __webpack_require__("./app/idea/phase-2/phase-2-0.component.ts");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            header_component_1.HeaderComponent,
            footer_component_1.FooterComponent,
            dashboard_component_1.DashboardComponent,
            login_component_1.LoginComponent,
            idea_component_1.IdeaComponent,
            phase_1_0_component_1.Phase_1_0_Component,
            phase_1_1_component_1.Phase_1_1_Component,
            phase_2_0_component_1.Phase_2_0_Component
        ],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot([
                { path: 'login', component: login_component_1.LoginComponent },
                { path: 'idea/:id', component: idea_component_1.IdeaComponent },
                { path: '', component: dashboard_component_1.DashboardComponent },
            ])
        ],
        providers: [
            auth_service_1.AuthService,
            data_service_1.DataService,
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;


/***/ },

/***/ "./app/auth.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(3);
__webpack_require__(4);
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.login = function (userid, password) {
        return this.http.get('/_data/users/' + userid + '.json')
            .map(function (response) {
            var res = response.json();
            if (res['password'] == password) {
                localStorage.setItem('currentUser', JSON.stringify(res));
                return res;
            }
            else {
                return "Incorrect password";
            }
        }, function (error) {
            return "Incorrect username";
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;


/***/ },

/***/ "./app/dashboard/dashboard.component.html":
/***/ function(module, exports) {

module.exports = "<header-component></header-component>\n\n<main>\n\n<section id=\"dashboard\">\n\n  <div class=\"ui cards\">\n    <div *ngFor=\"let idea of ideas\" class=\"card\">\n      <div class=\"content\">\n        <h3 class=\"header\">{{ idea.title }}</h3>\n        <p class=\"description\">{{ idea.description }}</p>\n        <a routerLink=\"/idea/{{ idea.id }}\" class=\"ui primary button\">Expand</a>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"content\">\n        <a href=\"#\" class=\"ui button grey\">Add a New Idea</a>\n      </div>\n    </div>\n  </div>\n</section>\n\n</main>\n\n<footer-component></footer-component>"

/***/ },

/***/ "./app/dashboard/dashboard.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var data_service_1 = __webpack_require__("./app/data.service.ts");
var DashboardComponent = (function () {
    function DashboardComponent(dataService) {
        this.dataService = dataService;
        this.getIdeas();
    }
    DashboardComponent.prototype.getIdeas = function () {
        var _this = this;
        return this.dataService.getData().subscribe(function (res) {
            _this.ideas = res;
            console.log(res);
        }, function (err) { return console.log(err); });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard-component',
        template: __webpack_require__("./app/dashboard/dashboard.component.html"),
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;


/***/ },

/***/ "./app/data.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(3);
var router_1 = __webpack_require__(2);
__webpack_require__(4);
var DataService = (function () {
    function DataService(http, route) {
        this.http = http;
        this.route = route;
    }
    DataService.prototype.getData = function () {
        return this.http.get('../_data/ideas.json').map(function (res) {
            var response = res.json();
            return response;
        }, function (error) { return error; });
    };
    DataService.prototype.getIdea = function (id) {
        console.log('called:' + id);
        return this.http.get('../_data/ideas/' + id + '.json').map(function (res) {
            var response = res.json();
            return response;
        }, function (error) { return error; });
    };
    DataService.prototype.returnData = function (paramName) {
        return this.http.get('/_data/' + paramName + '.json').map(function (res) { return res; }, function (err) { return err; });
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.ActivatedRoute])
], DataService);
exports.DataService = DataService;


/***/ },

/***/ "./app/footer/footer.component.html":
/***/ function(module, exports) {

module.exports = "<footer id=\"app-footer\">\n    <p>Copyright &copy; 2017 Zebra. All rights reserved.</p>\n</footer>"

/***/ },

/***/ "./app/footer/footer.component.scss":
/***/ function(module, exports) {

module.exports = "footer {\n  border-top: 1px solid #999;\n  padding: .5em 15px;\n  clear: both;\n}\n\n"

/***/ },

/***/ "./app/footer/footer.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var FooterComponent = (function () {
    function FooterComponent() {
    }
    return FooterComponent;
}());
FooterComponent = __decorate([
    core_1.Component({
        selector: 'footer-component',
        template: __webpack_require__("./app/footer/footer.component.html"),
        styles: [__webpack_require__("./app/footer/footer.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);
exports.FooterComponent = FooterComponent;


/***/ },

/***/ "./app/header/header.component.html":
/***/ function(module, exports) {

module.exports = "<header id=\"app-header\">\n        <a routerLink=\"/\" class=\"ui button black\">Zebra</a>\n        <div class=\"header-buttons\">\n            <a *ngIf=\"!user\" routerLink=\"login\" class=\"ui primary button\">Login</a>\n            <a *ngIf=\"user\" (click)=\"logout()\" class=\"ui button\">Logout</a>\n        </div>\n</header>"

/***/ },

/***/ "./app/header/header.component.scss":
/***/ function(module, exports) {

module.exports = "header {\n  padding: .5em 15px;\n  background: #111;\n  zoom: 1;\n}\n\nheader:after {\n  content: '';\n  height: 0;\n  clear: both;\n  display: block;\n  visibility: hidden;\n}\n\nheader .logo {\n  width: 50%;\n  float: left;\n  color: #fff;\n}\n\nheader .header-buttons {\n  width: 50%;\n  float: right;\n  text-align: right;\n}\n\n"

/***/ },

/***/ "./app/header/header.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var auth_service_1 = __webpack_require__("./app/auth.service.ts");
var router_1 = __webpack_require__(2);
var HeaderComponent = (function () {
    function HeaderComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.setUser();
    }
    HeaderComponent.prototype.setUser = function () {
        this.user = localStorage.getItem('currentUser');
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
        this.setUser();
        this.router.navigate(['login']);
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'header-component',
        template: __webpack_require__("./app/header/header.component.html"),
        styles: [__webpack_require__("./app/header/header.component.scss")]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;


/***/ },

/***/ "./app/idea/idea.component.html":
/***/ function(module, exports) {

module.exports = "<header-component></header-component>\n\n<main id=\"idea\" *ngIf=\"idea\">\n\n    <div class=\"ui cards grid\">\n\n        <!-- finish phase'd tier architecture for idea list -->\n        <phase-1-0 \n            *ngIf=\"idea.currentPhase == 1\" \n            [idea]=\"idea\"\n            class=\"card eleven wide column\"\n        ></phase-1-0>\n        <phase-1-1 \n            *ngIf=\"idea.currentPhase == 1.1\" \n            [idea]=\"idea\"\n            class=\"card eleven wide column\"\n        ></phase-1-1>\n        <phase-2-0\n            *ngIf=\"idea.currentPhase == 2\"\n            [idea]=\"idea\"\n            class=\"card eleven wide column\"\n        ></phase-2-0>\n\n        <div class=\"card four wide column\">\n            \n            <div class=\"content\">\n                <h1 class=\"header\">{{ idea.title }}</h1>\n            </div>\n\n            <div class=\"content\">\n\n                <h3>Description:</h3>\n                <p>{{ idea.description }}</p>\n\n            </div>\n\n            <div class=\"content\">\n\n                <h3>Goals:</h3>\n                <ul>\n                    <li *ngFor=\"let goal of idea.goals\">{{ goal.name }}</li>\n                </ul>\n\n            </div>\n\n        </div>\n\n    </div>\n\n</main>\n\n<footer-component></footer-component>"

/***/ },

/***/ "./app/idea/idea.component.scss":
/***/ function(module, exports) {

module.exports = ".idea-sandbox {\n  width: 70%;\n  float: left;\n  padding: 2em;\n  background: #fff;\n  border: 1px solid #ccc;\n  box-shadow: 0 0 10px #ddd;\n}\n\n.idea-banner {\n  background: #666;\n  color: #fff;\n  margin-left: -2em;\n  margin-top: -2em;\n  width: 100%;\n  padding: 1em 2em;\n  box-sizing: content-box;\n  margin-bottom: 2em;\n  text-align: center;\n  position: relative;\n}\n\n.idea-banner small {\n  display: block;\n}\n\n.idea-banner .next-phase {\n  position: absolute;\n  right: 2em;\n  top: 1em;\n  text-align: right;\n}\n\n.form-utilities {\n  background: #ccc;\n  width: 100%;\n  margin-top: -.5em;\n}\n\n.form-utilities:after {\n  content: '';\n  height: 0;\n  clear: both;\n  display: block;\n  visibility: hidden;\n}\n\n.form-utilities .primary-cta {\n  float: right;\n}\n\n.idea-sidebar {\n  width: 25%;\n  float: right;\n  padding: 2em;\n  border: 1px solid #ccc;\n  box-shadow: 0 0 10px #ddd;\n  background: #fff;\n}\n\ntextarea {\n  resize: none;\n  width: 100%;\n  height: 8em;\n  padding: .5em;\n}\n\n"

/***/ },

/***/ "./app/idea/idea.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var data_service_1 = __webpack_require__("./app/data.service.ts");
var router_1 = __webpack_require__(2);
var IdeaComponent = (function () {
    function IdeaComponent(dataService, route) {
        this.dataService = dataService;
        this.route = route;
        // pass ID from route into getData();
        this.getData(this.route.snapshot.params['id']);
    }
    // get Idea data from service
    IdeaComponent.prototype.getData = function (ideaId) {
        var _this = this;
        this.dataService.getIdea(ideaId).subscribe(function (res) {
            _this.idea = res;
        });
    };
    return IdeaComponent;
}());
IdeaComponent = __decorate([
    core_1.Component({
        selector: 'idea-component',
        template: __webpack_require__("./app/idea/idea.component.html"),
        styles: [__webpack_require__("./app/idea/idea.component.scss")]
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute])
], IdeaComponent);
exports.IdeaComponent = IdeaComponent;


/***/ },

/***/ "./app/idea/phase-1/phase-1-0.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"content\">\n    <div class=\"header\">\n        <h1>Phase 1: Generate Ideas</h1>\n    </div>\n</div>\n\n<div class=\"content\">\n    <h3>Add an idea:</h3>\n    <form class=\"ui form\">\n        <textarea></textarea>\n        <a class=\"ui primary button right floated\">Add Idea</a>\n    </form>\n</div>\n\n<div class=\"content\">\n    <div class=\"header\">\n        <h2>Current Ideas:</h2>\n    </div>\n    <div class=\"ui relaxed divided list\">\n        <div class=\"item\" *ngFor=\"let currentIdea of idea.ideas; let i = index\">\n            <p class=\"header left floated \">{{ currentIdea.text }}</p>\n                <button \n                    *ngIf=\"idea.currentPhase == 1.1\" \n                    class=\"ui labeled icon button basic right floated\"\n                    (click)=\"toggleState(i)\"\n                    [class.positive]=\"isSelected(i)\"\n                >\n                    <i class=\"plus icon\"></i>\n                    {{ currentIdea.votes }}\n                </button>\n        </div>\n    </div>\n</div>"

/***/ },

/***/ "./app/idea/phase-1/phase-1-0.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Phase_1_0_Component = (function () {
    function Phase_1_0_Component() {
        console.log(this.idea);
    }
    return Phase_1_0_Component;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Phase_1_0_Component.prototype, "idea", void 0);
Phase_1_0_Component = __decorate([
    core_1.Component({
        selector: 'phase-1-0',
        template: __webpack_require__("./app/idea/phase-1/phase-1-0.component.html")
    }),
    __metadata("design:paramtypes", [])
], Phase_1_0_Component);
exports.Phase_1_0_Component = Phase_1_0_Component;


/***/ },

/***/ "./app/idea/phase-1/phase-1-1.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"content\">\n    <div class=\"header\">\n        <h1>Phase 1: Generate Ideas</h1>\n    </div>\n</div>\n\n<div class=\"content\">\n    <p class=\"ui compact message\">\n        Use your votes to choose which ideas you believe the team should explore.\n    </p>\n    <br/>\n    <p class=\"ui compact message\" [class.info]=\"totalVotes != 0\" [class.error]=\"totalVotes == 0\">\n        You have {{ totalVotes }} votes left.\n    </p>\n</div>\n\n<div class=\"content\">\n    <div class=\"header\">\n        <h2>Current Ideas:</h2>\n    </div>\n    <div class=\"ui relaxed divided list\">\n        <div class=\"item\" *ngFor=\"let currentIdea of idea.ideas; let i = index\">\n            <p class=\"header left floated \">{{ currentIdea.text }}</p>\n                <button\n                    class=\"ui labeled icon button basic right floated\"\n                    (click)=\"toggleState(i)\"\n                    [class.positive]=\"isSelected(i)\"\n                >\n                    <i class=\"plus icon\"></i>\n                    {{ currentIdea.votes }}\n                </button>\n        </div>\n    </div>\n</div>"

/***/ },

/***/ "./app/idea/phase-1/phase-1-1.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Phase_1_1_Component = (function () {
    function Phase_1_1_Component() {
        this.totalVotes = 2;
        this.votes = [];
    }
    Phase_1_1_Component.prototype.toggleState = function (index) {
        if (this.votes[index] == true) {
            this.votes[index] = false;
            this.totalVotes++;
        }
        else {
            if (this.totalVotes == 0) {
                return false;
            }
            this.votes[index] = true;
            this.totalVotes--;
        }
    };
    Phase_1_1_Component.prototype.isSelected = function (index) {
        return this.votes[index];
    };
    return Phase_1_1_Component;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Phase_1_1_Component.prototype, "idea", void 0);
Phase_1_1_Component = __decorate([
    core_1.Component({
        selector: 'phase-1-1',
        template: __webpack_require__("./app/idea/phase-1/phase-1-1.component.html")
    }),
    __metadata("design:paramtypes", [])
], Phase_1_1_Component);
exports.Phase_1_1_Component = Phase_1_1_Component;


/***/ },

/***/ "./app/idea/phase-2/phase-2-0.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"content\">\n    <div class=\"header\">\n        <h1>Phase 2: Explore Ideas</h1>\n    </div>\n</div>\n\n<div class=\"content\">\n    <p class=\"ui compact message\">\n        To begin Phase 3, choose which ideas to move forward. Alternatively, you could park ideas for later.\n    </p>\n</div>\n\n<div class=\"content\">\n    <div class=\"header\">\n        <h2>Ideas to consider:</h2>\n    </div>\n    <div class=\"ui relaxed divided list\">\n        <div class=\"item\" *ngFor=\"let currentIdea of idea.ideas; let i = index\">\n            <p class=\"header left floated \">{{ currentIdea.text }}</p>\n                <div class=\"right floated\">\n                    <button\n                        class=\"ui labeled icon basic button\"\n                    >\n                        <i class=\"save icon\"></i>\n                        Save for Later\n                    </button>\n                    <button\n                        class=\"ui labeled icon basic button\"\n                    >\n                        <i class=\"arrow circle right icon\"></i>\n                        Move Forward\n                    </button>\n                    <div \n                        class=\"ui label large\"\n                    >\n                       Votes\n                        <span class=\"detail\">{{ currentIdea.votes }}</span>\n                    </div>\n                </div>\n        </div>\n    </div>\n</div>"

/***/ },

/***/ "./app/idea/phase-2/phase-2-0.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var Phase_2_0_Component = (function () {
    function Phase_2_0_Component() {
        this.totalVotes = 2;
        this.votes = [];
    }
    Phase_2_0_Component.prototype.toggleState = function (index) {
        if (this.votes[index] == true) {
            this.votes[index] = false;
            this.totalVotes++;
        }
        else {
            if (this.totalVotes == 0) {
                return false;
            }
            this.votes[index] = true;
            this.totalVotes--;
        }
    };
    Phase_2_0_Component.prototype.isSelected = function (index) {
        return this.votes[index];
    };
    return Phase_2_0_Component;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Phase_2_0_Component.prototype, "idea", void 0);
Phase_2_0_Component = __decorate([
    core_1.Component({
        selector: 'phase-2-0',
        template: __webpack_require__("./app/idea/phase-2/phase-2-0.component.html")
    }),
    __metadata("design:paramtypes", [])
], Phase_2_0_Component);
exports.Phase_2_0_Component = Phase_2_0_Component;


/***/ },

/***/ "./app/login/login.component.html":
/***/ function(module, exports) {

module.exports = "<header-component></header-component>\n\n<main id=\"login\">\n    <div class=\"ui centered card\">\n\n      <div class=\"content\">\n        <h1 class=\"header\">Login</h1>\n      </div>\n\n      <div class=\"content\">\n\n        <form class=\"ui form\">\n            \n            <span *ngIf=\"error\">{{ error }}</span>\n            \n            <label for=\"username\">Username</label>\n            <input \n                type=\"text\"\n                name=\"username\"\n                class=\"col-12 mb-1\" \n                [(ngModel)]=\"username\" \n            />\n            \n            <label for=\"password\">Password</label>\n            <input\n                type=\"text\" \n                name=\"password\"\n                class=\"col-12 mb-1\" \n                [(ngModel)]=\"password\" \n            />\n            \n            <div class=\"btn-wrapper\">\n                <input type=\"submit\" value=\"Sign In\" (click)=\"login()\" class=\"ui button primary\" />\n            </div>\n            \n        </form>\n\n        <div class=\"sign-up\">\n            <p>Need an account?</p>\n            <a class=\"ui button\">Sign Up</a>\n        </div>\n    </div>\n  </div>\n</main>\n\n<footer-component></footer-component>"

/***/ },

/***/ "./app/login/login.component.scss":
/***/ function(module, exports) {

module.exports = ".sign-up {\n  margin-top: 2em;\n  padding-top: 2em;\n  padding-bottom: 2em;\n  border-top: 1px solid #ccc;\n  text-align: center;\n}\n\nh3,\nh5 {\n  text-align: center;\n}\n\nh3 {\n  text-transform: uppercase;\n}\n\nh5 {\n  margin-top: 2em;\n}\n\ninput + label {\n  margin-top: 1em;\n}\n\n.btn-wrapper {\n  margin-top: 1em;\n  text-align: center;\n}\n\n"

/***/ },

/***/ "./app/login/login.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var auth_service_1 = __webpack_require__("./app/auth.service.ts");
var router_1 = __webpack_require__(2);
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.setUser();
    }
    LoginComponent.prototype.setUser = function () {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if (this.user) {
            this.router.navigate(['']);
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authService.login(this.username, this.password).subscribe(function (res) {
            if (res.name) {
                _this.setUser();
            }
            else {
                _this.error = res;
            }
        }, function (err) { console.log(err); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-component',
        styles: [__webpack_require__("./app/login/login.component.scss")],
        template: __webpack_require__("./app/login/login.component.html")
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;


/***/ },

/***/ "./main.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_module__ = __webpack_require__("./app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__app_app_module__);




__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["platformBrowserDynamic"])().bootstrapModule( __WEBPACK_IMPORTED_MODULE_1__app_app_module__["AppModule"] );

/***/ },

/***/ "./node_modules/reflect-metadata/Reflect.js":
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    // feature test for Object.create support
    var supportsCreate = typeof Object.create === "function";
    // feature test for __proto__ support
    var supportsProto = (function () {
        var sentinel = {};
        function __() { }
        __.prototype = sentinel;
        var instance = new __();
        return instance.__proto__ === sentinel;
    })();
    // create an object in dictionary mode (a.k.a. "slow" mode in v8)
    var createDictionary = supportsCreate ? function () { return MakeDictionary(Object.create(null)); } :
        supportsProto ? function () { return MakeDictionary({ __proto__: null }); } :
            function () { return MakeDictionary({}); };
    var HashMap;
    (function (HashMap) {
        var downLevel = !supportsCreate && !supportsProto;
        HashMap.has = downLevel
            ? function (map, key) { return hasOwn.call(map, key); }
            : function (map, key) { return key in map; };
        HashMap.get = downLevel
            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
            : function (map, key) { return map[key]; };
    })(HashMap || (HashMap = {}));
    // Load global or shim versions of Map, Set, and WeakMap
    var functionPrototype = Object.getPrototypeOf(Function);
    var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
    var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    var Metadata = new _WeakMap();
    /**
      * Applies a set of decorators to a property of a target object.
      * @param decorators An array of decorators.
      * @param target The target object.
      * @param targetKey (Optional) The property key to decorate.
      * @param targetDescriptor (Optional) The property descriptor for the target key
      * @remarks Decorators are applied in reverse order.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Example = Reflect.decorate(decoratorsArray, Example);
      *
      *     // property (on constructor)
      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Object.defineProperty(Example, "staticMethod",
      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
      *
      *     // method (on prototype)
      *     Object.defineProperty(Example.prototype, "method",
      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
      *
      */
    function decorate(decorators, target, targetKey, targetDescriptor) {
        if (!IsUndefined(targetDescriptor)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            if (IsUndefined(targetKey))
                throw new TypeError();
            if (!IsObject(targetDescriptor))
                throw new TypeError();
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
        }
        else if (!IsUndefined(targetKey)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
        }
        else {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsConstructor(target))
                throw new TypeError();
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class Example {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
    function metadata(metadataKey, metadataValue) {
        function decorator(target, targetKey) {
            if (!IsUndefined(targetKey)) {
                if (!IsObject(target))
                    throw new TypeError();
                targetKey = ToPropertyKey(targetKey);
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
            }
            else {
                if (!IsConstructor(target))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, /*targetKey*/ undefined);
            }
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    /**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param targetKey (Optional) The property key for the target.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Reflect.defineMetadata("custom:annotation", options, Example);
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): Decorator {
      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
    }
    Reflect.defineMetadata = defineMetadata;
    /**
      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryHasMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasMetadata = hasMetadata;
    /**
      * Gets a value indicating whether the target object has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryGetMetadata(metadataKey, target, targetKey);
    }
    Reflect.getMetadata = getMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    /**
      * Gets the metadata keys defined on the target object or its prototype chain.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
      *
      */
    function getMetadataKeys(target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryMetadataKeys(target, targetKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    /**
      * Gets the unique metadata keys defined on the target object.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
      *
      */
    function getOwnMetadataKeys(target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryOwnMetadataKeys(target, targetKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    /**
      * Deletes the metadata entry from the target object with the provided key.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.deleteMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function deleteMetadata(metadataKey, target, targetKey) {
        // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#deletemetadata-metadatakey-p-
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        if (!metadataMap.delete(metadataKey))
            return false;
        if (metadataMap.size > 0)
            return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(targetKey);
        if (targetMetadata.size > 0)
            return true;
        Metadata.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated)) {
                if (!IsConstructor(decorated))
                    throw new TypeError();
                target = decorated;
            }
        }
        return target;
    }
    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated)) {
                if (!IsObject(decorated))
                    throw new TypeError();
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            decorator(target, propertyKey);
        }
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#getorcreatemetadatamap--o-p-create-
    function GetOrCreateMetadataMap(target, targetKey, create) {
        var targetMetadata = Metadata.get(target);
        if (!targetMetadata) {
            if (!create)
                return undefined;
            targetMetadata = new _Map();
            Metadata.set(target, targetMetadata);
        }
        var keyMetadata = targetMetadata.get(targetKey);
        if (!keyMetadata) {
            if (!create)
                return undefined;
            keyMetadata = new _Map();
            targetMetadata.set(targetKey, keyMetadata);
        }
        return keyMetadata;
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return true;
        var parent = GetPrototypeOf(O);
        return parent !== null ? OrdinaryHasMetadata(MetadataKey, parent, P) : false;
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
        return metadataMap !== undefined && Boolean(metadataMap.has(MetadataKey));
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetmetadata--metadatakey-o-p-
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = GetPrototypeOf(O);
        return parent !== null ? OrdinaryGetMetadata(MetadataKey, parent, P) : undefined;
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
        return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarymetadatakeys--o-p-
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = GetPrototypeOf(O);
        if (parent === null)
            return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
            return ownKeys;
        if (ownKeys.length <= 0)
            return parentKeys;
        var keys = new _Set();
        for (var _i = 0; _i < ownKeys.length; _i++) {
            var key = ownKeys[_i];
            keys.add(key);
        }
        for (var _a = 0; _a < parentKeys.length; _a++) {
            var key = parentKeys[_a];
            keys.add(key);
        }
        return getKeys(keys);
    }
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryownmetadatakeys--o-p-
    function OrdinaryOwnMetadataKeys(target, targetKey) {
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
        var keys = [];
        if (metadataMap)
            forEach(metadataMap, function (_, key) { return keys.push(key); });
        return keys;
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
        return x === undefined;
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
    function IsArray(x) {
        return Array.isArray ? Array.isArray(x) : x instanceof Array || Object.prototype.toString.call(x) === "[object Array]";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
    function IsConstructor(x) {
        return typeof x === "function";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
    function ToPropertyKey(value) {
        return IsSymbol(value) ? value : String(value);
    }
    function GetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
            return proto;
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass Exampleonstructor. Compatible implementations
        // must either set __proto__ on a subclass Exampleonstructor to the superclass Exampleonstructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
        if (proto !== functionPrototype)
            return proto;
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
        // If the constructor was not a function, then we cannot determine the heritage.
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
            return proto;
        // If we have some kind of self-reference, then we cannot determine the heritage.
        if (constructor === O)
            return proto;
        // we have a pretty good guess at the heritage.
        return constructor;
    }
    function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? undefined : result;
    }
    function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
            f.call(iterator);
    }
    function forEach(source, callback, thisArg) {
        var entries = source.entries;
        if (typeof entries === "function") {
            var iterator = entries.call(source);
            var result;
            try {
                while (result = IteratorStep(iterator)) {
                    var _a = result.value, key = _a[0], value = _a[1];
                    callback.call(thisArg, value, key, source);
                }
            }
            finally {
                if (result)
                    IteratorClose(iterator);
            }
        }
        else {
            var forEach_1 = source.forEach;
            if (typeof forEach_1 === "function") {
                forEach_1.call(source, callback, thisArg);
            }
        }
    }
    function getKeys(source) {
        var keys = [];
        forEach(source, function (_, key) { keys.push(key); });
        return keys;
    }
    // naive MapIterator shim
    function CreateMapIterator(keys, values, kind) {
        var index = 0;
        return {
            next: function () {
                if ((keys || values) && index < (keys || values).length) {
                    var current = index++;
                    switch (kind) {
                        case "key": return { value: keys[current], done: false };
                        case "value": return { value: values[current], done: false };
                        case "key+value": return { value: [keys[current], values[current]], done: false };
                    }
                }
                keys = undefined;
                values = undefined;
                return { value: undefined, done: true };
            },
            "throw": function (error) {
                if (keys || values) {
                    keys = undefined;
                    values = undefined;
                }
                throw error;
            },
            "return": function (value) {
                if (keys || values) {
                    keys = undefined;
                    values = undefined;
                }
                return { value: value, done: true };
            }
        };
    }
    // naive Map shim
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        return (function () {
            function Map() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            }
            Object.defineProperty(Map.prototype, "size", {
                get: function () { return this._keys.length; },
                enumerable: true,
                configurable: true
            });
            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
            Map.prototype.get = function (key) {
                var index = this._find(key, /*insert*/ false);
                return index >= 0 ? this._values[index] : undefined;
            };
            Map.prototype.set = function (key, value) {
                var index = this._find(key, /*insert*/ true);
                this._values[index] = value;
                return this;
            };
            Map.prototype.delete = function (key) {
                var index = this._find(key, /*insert*/ false);
                if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                        this._keys[i - 1] = this._keys[i];
                        this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                    return true;
                }
                return false;
            };
            Map.prototype.clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            };
            Map.prototype.keys = function () { return CreateMapIterator(this._keys, /*values*/ undefined, "key"); };
            Map.prototype.values = function () { return CreateMapIterator(/*keys*/ undefined, this._values, "value"); };
            Map.prototype.entries = function () { return CreateMapIterator(this._keys, this._values, "key+value"); };
            Map.prototype._find = function (key, insert) {
                if (this._cacheKey === key)
                    return this._cacheIndex;
                var index = this._keys.indexOf(key);
                if (index < 0 && insert) {
                    index = this._keys.length;
                    this._keys.push(key);
                    this._values.push(undefined);
                }
                return this._cacheKey = key, this._cacheIndex = index;
            };
            return Map;
        })();
    }
    // naive Set shim
    function CreateSetPolyfill() {
        return (function () {
            function Set() {
                this._map = new _Map();
            }
            Object.defineProperty(Set.prototype, "size", {
                get: function () { return this._map.size; },
                enumerable: true,
                configurable: true
            });
            Set.prototype.has = function (value) { return this._map.has(value); };
            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
            Set.prototype.delete = function (value) { return this._map.delete(value); };
            Set.prototype.clear = function () { this._map.clear(); };
            Set.prototype.keys = function () { return this._map.keys(); };
            Set.prototype.values = function () { return this._map.values(); };
            Set.prototype.entries = function () { return this._map.entries(); };
            return Set;
        })();
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = createDictionary();
        var rootKey = CreateUniqueKey();
        return (function () {
            function WeakMap() {
                this._key = CreateUniqueKey();
            }
            WeakMap.prototype.has = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.has(table, this._key) : false;
            };
            WeakMap.prototype.get = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.get(table, this._key) : undefined;
            };
            WeakMap.prototype.set = function (target, value) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                table[this._key] = value;
                return this;
            };
            WeakMap.prototype.delete = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? delete table[this._key] : false;
            };
            WeakMap.prototype.clear = function () {
                // NOTE: not a real clear, just makes the previous data unreachable
                this._key = CreateUniqueKey();
            };
            return WeakMap;
        })();
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
                buffer[i] = Math.random() * 0xff | 0;
            return buffer;
        }
        function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
                if (typeof crypto !== "undefined")
                    return crypto.getRandomValues(new Uint8Array(size));
                if (typeof msCrypto !== "undefined")
                    return msCrypto.getRandomValues(new Uint8Array(size));
                return FillRandomBytes(new Uint8Array(size), size);
            }
            return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            // mark as random - RFC 4122 § 4.4
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8)
                    result += "-";
                if (byte < 16)
                    result += "0";
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
        function CreateUniqueKey() {
            var key;
            do
                key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create)
                    return undefined;
                Object.defineProperty(target, rootKey, { value: createDictionary() });
            }
            return target[rootKey];
        }
    }
    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
    function MakeDictionary(obj) {
        obj.__DICTIONARY_MODE__ = 1;
        delete obj.____DICTIONARY_MODE__;
        return obj;
    }
    // patch global Reflect
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    if (hasOwn.call(Reflect, p)) {
                        __global.Reflect[p] = Reflect[p];
                    }
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof window !== "undefined" ? window :
        typeof WorkerGlobalScope !== "undefined" ? self :
            typeof global !== "undefined" ? global :
                Function("return this;")());
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ },

/***/ "./node_modules/webpack/buildin/global.js":
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("./node_modules/@angular/core/index.js");

/***/ },

/***/ 1:
/***/ function(module, exports) {

module.exports = __vendor;

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/reflect-metadata/Reflect.js");
__webpack_require__(5);
__webpack_require__(6);
module.exports = __webpack_require__("./main.ts");


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("./node_modules/@angular/router/index.js");

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("./node_modules/@angular/http/index.js");

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("./node_modules/rxjs/add/operator/map.js");

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("./node_modules/ts-helpers/index.js");

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("./node_modules/zone.js/dist/zone.js");

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("./node_modules/@angular/forms/index.js");

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("./node_modules/@angular/platform-browser-dynamic/index.js");

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("./node_modules/@angular/platform-browser/index.js");

/***/ }

/******/ });
//# sourceMappingURL=app.map