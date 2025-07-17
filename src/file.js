// 拓展名映射到mime的映射（常见的）
const extensionToMimeType = {
  // 图片
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  // 音频
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  // 视频
  mp4: "video/mp4",
  webm: "video/webm",
  // 文档
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  html: "text/html",
  htm: "text/html",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  xml: "application/xml",
  // 压缩文件
  zip: "application/zip",
  gz: "application/gzip",
  rar: "application/x-rar-compressed",
};

// mime映射到拓展名（常见的）
const mimeTypeToExtension = {
  // 图片类型
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/webp": "webp",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/avif": "avif",
  "image/x-icon": "ico",

  // 文档类型
  "application/pdf": "pdf",
  "text/plain": "txt",
  "text/html": "html",
  "text/css": "css",
  "text/javascript": "js",
  "application/json": "json",
  "application/xml": "xml",
  "text/csv": "csv",
  "application/rtf": "rtf",

  // 微软 Office 文档
  "application/msword": "doc",
  "application/vnd.ms-excel": "xls",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",

  // 压缩文件
  "application/zip": "zip",
  "application/gzip": "gz",
  "application/x-tar": "tar",
  "application/x-rar-compressed": "rar",
  "application/x-7z-compressed": "7z",

  // 音频类型
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
  "audio/flac": "flac",
  "audio/mp4": "m4a",
  "audio/webm": "webm",
  "audio/x-ms-wma": "wma",

  // 视频类型
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogv",
  "video/x-msvideo": "avi",
  "video/mpeg": "mpeg",
  "video/quicktime": "mov",
  "video/x-matroska": "mkv",

  // 字体类型
  "font/ttf": "ttf",
  "font/otf": "otf",
  "font/woff": "woff",
  "font/woff2": "woff2",
  "font/eot": "eot",

  // 其他常见类型
  "application/octet-stream": "bin",
  "application/x-sh": "sh",
  "application/x-msdownload": "exe",
  "application/x-java-applet": "class",
  "application/x-bittorrent": "torrent",
  "application/x-sqlite3": "db",
  "application/x-font-ttf": "ttf",

  // 网页相关
  "application/javascript": "js",
  "application/xhtml+xml": "xhtml",
  "application/atom+xml": "atom",
  "application/rss+xml": "rss",

  // 数据交换
  "application/ld+json": "jsonld",
  "application/x-www-form-urlencoded": "urlencoded",
  "multipart/form-data": "formdata",

  // 其他
  "model/stl": "stl",
  "image/heic": "heic",
  "application/x-bzip2": "bz2",
  "text/markdown": "md",
  "application/x-pem-file": "pem",
  "application/x-x509-ca-cert": "crt",
};

/**
 * @description 根据拓展名获取mime
 * @param {string} extension 拓展名：png、.png、JPG
 * @returns {string|undefined} mime类型
 */
export const getMimeTypeByExtension = (extension) => {
  // 转换为小写并去除开头的点（如果有）
  const ext = extension.toLowerCase().replace(/^\./, "");
  return extensionToMimeType[ext];
};

/**
 * @description 根据mime类型获取拓展名
 * @param {string} mimeType mime类型：image/png
 * @returns {string|undefined} 拓展名
 */
export const getExtensionByMimeType = (mimeType) => {
  return mimeTypeToExtension[mimeType.toLowerCase()];
};

/**
 * @description base64数据转成blob
 * @param {string} base64Data base64数据(前缀可带可不带)
 * @param {string} contentType 拓展名或mime类型
 * @returns {blob}
 */
export const base64ToBlob = (base64Data, contentType = "") => {
  // 提取 Base64 前缀中的 MIME 类型（如果存在）
  const matches = base64Data.match(/^data:([^;]+);base64,/);
  const mimeTypeFromPrefix = matches?.[1];

  // 处理传入的 contentType 参数
  let resolvedMimeType = "";

  if (contentType) {
    // 如果包含斜杠，认为是 MIME 类型（如 "image/jpeg"）
    if (contentType.includes("/")) {
      resolvedMimeType = contentType;
    }
    // 否则认为是扩展名（如 "jpg"），尝试映射
    else {
      resolvedMimeType = getMimeTypeByExtension(contentType);
    }
  }

  // 最终 MIME 类型优先级：手动传入 > Base64 前缀 > 默认
  return new Blob(
    [
      Uint8Array.from(
        atob(base64Data.replace(/^data:[^;]+;base64,/, "")),
        (c) => c.charCodeAt(0)
      ),
    ],
    {
      type:
        resolvedMimeType || mimeTypeFromPrefix || "application/octet-stream",
    }
  );
};

/**
 * @description base64数据转成blob url
 * @param {string} base64Data base64数据(前缀可带可不带)
 * @param {string} contentType 拓展名或mime类型
 * @returns {string}
 */
export const base64ToBlobUrl = (base64Data, contentType = "") => {
  const blob = base64ToBlob(base64Data, contentType);
  return URL.createObjectURL(blob);
};

/**
 * @description blob数据转成base64数据(带前缀)
 * @param {blob} blob blob数据
 * @returns {string}
 */
export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * @description blob url转成base64数据(带前缀)
 * @param {string} blobUrl blob url
 * @returns {string}
 */
export const blobUrlToBase64 = async (blobUrl) => {
  try {
    // 通过 fetch API 获取 Blob 对象
    const response = await fetch(blobUrl);
    if (!response.ok) {
      throw new Error(`fetch blobUrl error! status: ${response.status}`);
    }

    const blob = await response.blob();

    // 使用 FileReader 将 Blob 转换为 Base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // 返回带 MIME 前缀的 Base64
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw error;
  }
};

/**
 * @description 解析base64数据(带前缀)获取base64数据(不带前缀)、mime、拓展名
 * @param {string} blobUrl blob url
 * @returns {string}
 */
export const parseBase64 = (base64) => {
  // 正则表达式匹配 MIME 类型和 Base64 数据
  const matches = base64.match(/^data:([^;]+);base64,(.*)$/);

  let result = {
    mime: "application/octet-stream",
    base64,
    extension: "",
  };

  if (matches && matches.length === 3) {
    result.mime = matches[1];
    result.base64 = matches[2];

    const ext = getExtensionByMimeType(result.mime);
    if (ext) {
      result.extension = ext;
    }
  }

  return result;
};

/**
 * @description 下载文件
 * @param {string} url 文件路径
 * @param {string} fileName 文件名称
 */
export const downloadFile = (url, fileName = "下载文件") => {
  // 创建a标签
  const a = document.createElement("a");
  // 设置下载链接和文件名
  a.href = url;
  a.download = fileName;
  // 触发点击事件
  document.body.appendChild(a);
  a.click();
  // 移除a标签避免内存泄漏
  document.body.removeChild(a);
};
