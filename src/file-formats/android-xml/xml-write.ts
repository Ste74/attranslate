import { WriteTFileArgs } from "../file-format-definitions";
import { toXml } from "xml2json";
import { lookupIndent } from "./xml-cache";
import { XmlResourceFile } from "./android-xml";
import { writeUf8File } from "../../util/util";

export function writeXmlResourceFile(
  resourceFile: XmlResourceFile,
  args: WriteTFileArgs
) {
  const jsonString = JSON.stringify(resourceFile);
  const rawXmlString = toXml(jsonString, { sanitize: false });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const prettifyXml = require("prettify-xml");
  const prettyXmlString = prettifyXml(rawXmlString, {
    indent: lookupIndent(args),
  });
  const xmlString = `<?xml version="1.0" encoding="utf-8"?>\n${prettyXmlString}\n`;
  writeUf8File(args.path, xmlString);
}
